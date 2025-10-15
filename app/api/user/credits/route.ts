import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - Obtener créditos del usuario
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener créditos del usuario
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('credits_remaining, credits_total, plan')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user credits:', error);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      creditsRemaining: user.credits_remaining,
      creditsTotal: user.credits_total,
      plan: user.plan,
    });
  } catch (error) {
    console.error('Error in GET /api/user/credits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Decrementar o agregar créditos
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action, amount } = body;

    // Validar parámetros
    if (!action || !amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid parameters. Required: action (decrement|add), amount (positive number)' },
        { status: 400 }
      );
    }

    if (action !== 'decrement' && action !== 'add') {
      return NextResponse.json(
        { error: 'Invalid action. Must be "decrement" or "add"' },
        { status: 400 }
      );
    }

    // Obtener créditos actuales
    const { data: user, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('credits_remaining, credits_total, plan')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user:', fetchError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Si es decrement, verificar que tenga suficientes créditos
    if (action === 'decrement') {
      if (user.credits_remaining < amount) {
        return NextResponse.json(
          {
            error: 'Insufficient credits',
            creditsRemaining: user.credits_remaining,
            required: amount
          },
          { status: 403 }
        );
      }
    }

    // Calcular nuevos créditos
    const newCredits =
      action === 'decrement'
        ? user.credits_remaining - amount
        : user.credits_remaining + amount;

    // Actualizar créditos
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        credits_remaining: newCredits,
        // Si es add, también actualizar credits_total
        ...(action === 'add' && { credits_total: user.credits_total + amount }),
      })
      .eq('id', userId)
      .select('credits_remaining, credits_total, plan')
      .single();

    if (updateError) {
      console.error('Error updating credits:', updateError);
      return NextResponse.json(
        { error: 'Failed to update credits' },
        { status: 500 }
      );
    }

    // Log de auditoría
    console.log(`Credits ${action}: User ${userId}, Amount: ${amount}, New balance: ${newCredits}`);

    return NextResponse.json({
      success: true,
      action,
      amount,
      creditsRemaining: updatedUser.credits_remaining,
      creditsTotal: updatedUser.credits_total,
      plan: updatedUser.plan,
    });
  } catch (error) {
    console.error('Error in PUT /api/user/credits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
