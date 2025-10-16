# 🔧 Clerk Webhook Troubleshooting Guide

**Problem:** Webhook no se está activando en producción
**Impact:** Usuarios no se sincronizan a Supabase
**Priority:** 🔴 Critical

---

## 📋 Checklist de Diagnóstico

### **Paso 1: Verificar que el Endpoint Existe en Producción**

```bash
# Test 1: Verificar que el endpoint responde
curl https://krysta-unspasmodic-natosha.ngrok-free.dev/api/test-webhook

# Respuesta esperada:
# {"message":"Webhook test endpoint is working","instructions":"..."}
```

**✅ Si funciona:** El servidor está accesible
**❌ Si falla:** Problema de conectividad o URL incorrecta

---

### **Paso 2: Verificar la URL en Clerk Dashboard**

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Selecciona tu **proyecto de producción** (no development)
3. Click en **"Webhooks"** en el menú lateral

**Verificar:**
- ✅ ¿Hay un webhook configurado?
- ✅ ¿La URL es correcta?
- ✅ ¿Los eventos están seleccionados? (`user.created`, `user.updated`, `user.deleted`)
- ✅ ¿El estado es "Active" (no "Paused")?

**URLs comunes:**
- ❌ `http://localhost:3000/api/auth/webhook` (desarrollo)
- ❌ `https://xxxxx.ngrok-free.dev/api/auth/webhook` (temporal, ngrok reinicia)
- ✅ `https://your-app.vercel.app/api/auth/webhook` (producción)

---

### **Paso 3: Verificar el Signing Secret**

En Clerk Dashboard → Webhooks → Tu endpoint → **"Signing Secret"**

```bash
# El secret debe empezar con "whsec_"
whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**En Vercel:**
1. Settings → Environment Variables
2. Buscar: `CLERK_WEBHOOK_SECRET`
3. **Debe tener el MISMO valor que Clerk**

**Si no existe o es diferente:**
```bash
# Agregar/actualizar en Vercel
Name: CLERK_WEBHOOK_SECRET
Value: whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Environment: Production ✅ (marcar SOLO production)
```

**IMPORTANTE:** Después de agregar/cambiar, debes **Redeploy**

---

### **Paso 4: Ver Logs del Webhook en Clerk**

Clerk Dashboard → Webhooks → Tu endpoint → **"Logs"**

**Posibles errores:**

| Status | Significado | Solución |
|--------|-------------|----------|
| `200 OK` | ✅ Funcionando | Todo bien |
| `401 Unauthorized` | ❌ Secret incorrecto | Verificar `CLERK_WEBHOOK_SECRET` |
| `400 Bad Request` | ❌ Headers o body inválido | Ver logs de Vercel |
| `404 Not Found` | ❌ URL incorrecta | Corregir URL en Clerk |
| `500 Internal Error` | ❌ Error en tu código | Ver logs de Vercel |
| `Timeout` | ❌ Servidor no responde | Problema de conectividad |

---

### **Paso 5: Ver Logs en Vercel**

**Opción A: Vercel Dashboard**
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Tu proyecto → "Deployments" → Latest
3. Click "View Function Logs"
4. Buscar: `[Clerk Webhook]`

**Opción B: Vercel CLI**
```bash
vercel logs --follow
```

**Buscar estos logs:**
```
[Clerk Webhook] 🔔 Webhook request received
[Clerk Webhook] ✅ Webhook secret found
[Clerk Webhook] 🔐 Verifying signature...
[Clerk Webhook] ✅ Signature verified successfully
[Clerk Webhook] 📨 Event type: user.created
[Webhook] Creating user: { id, email, name }
[Webhook] User created in Supabase: ...
```

**Si NO ves estos logs:** El webhook NO está llegando a tu servidor

---

## 🔍 Diagnóstico Avanzado

### **Problema 1: Webhook no llega al servidor**

**Síntomas:**
- No hay logs de `[Clerk Webhook]` en Vercel
- Clerk muestra errores de timeout o 404

**Causas posibles:**
1. **URL incorrecta en Clerk**
2. **Ngrok domain cambió** (si usas ngrok)
3. **Firewall bloqueando** (raro en Vercel)

**Solución:**
```bash
# Test manual desde Clerk:
# Dashboard → Webhooks → Tu endpoint → "Send Test Event"

# Debe aparecer en logs de Vercel inmediatamente
```

---

### **Problema 2: Webhook llega pero falla**

**Síntomas:**
- Ves logs de `[Clerk Webhook] 🔔 Webhook request received`
- Pero luego hay un error

**Error A: Signature verification failed**
```
[Clerk Webhook] ❌ Signature verification failed
```

**Causa:** Secret incorrecto en Vercel

**Solución:**
1. Copiar secret de Clerk Dashboard (whsec_xxx)
2. Actualizar `CLERK_WEBHOOK_SECRET` en Vercel
3. Redeploy

---

**Error B: CLERK_WEBHOOK_SECRET not configured**
```
[Clerk Webhook] ❌ CLERK_WEBHOOK_SECRET not configured!
```

**Causa:** Variable de entorno no existe

**Solución:**
```bash
# En Vercel:
Settings → Environment Variables → Add
Name: CLERK_WEBHOOK_SECRET
Value: whsec_xxxxxxxx
Environment: Production ✅
```

Luego **Redeploy**

---

**Error C: Supabase error**
```
[Webhook] Error creating user in Supabase: ...
```

**Causa:** Problema con Supabase (conexión, permisos, etc.)

**Solución:**
1. Verificar `SUPABASE_SERVICE_KEY` en Vercel
2. Verificar que la tabla `users` existe
3. Verificar permisos en Supabase

---

### **Problema 3: Webhook funciona pero usuario no se crea**

**Síntomas:**
- Clerk logs muestran `200 OK`
- Vercel logs muestran éxito
- Pero usuario NO aparece en Supabase

**Causa:** Posible error silencioso o duplicate key

**Solución:**
```sql
-- Verificar en Supabase SQL Editor:
SELECT * FROM users WHERE id = 'user_347wphPZOlj09wXmJn6ilwjvOQH';

-- Si no existe, crear manualmente:
INSERT INTO users (id, email, name, plan, credits_remaining, credits_total)
VALUES ('user_347wphPZOlj09wXmJn6ilwjvOQH', 'email@example.com', 'Name', 'free', 1, 1);
```

---

## 🧪 Pruebas Manuales

### **Test 1: Connectivity Test**

```bash
# Probar que el endpoint está accesible
curl -X POST https://your-app.vercel.app/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "connectivity"}'

# Respuesta esperada:
# {"success":true,"message":"Webhook test endpoint reached successfully",...}
```

**✅ Si funciona:** El servidor está accesible desde internet

---

### **Test 2: Send Test Event desde Clerk**

1. Clerk Dashboard → Webhooks → Tu endpoint
2. Click **"Send Test Event"**
3. Seleccionar `user.created`
4. Click "Send"

**Verificar:**
- Logs en Clerk (debe mostrar `200 OK`)
- Logs en Vercel (debe mostrar procesamiento)
- Usuario en Supabase (debe aparecer el test user)

---

### **Test 3: Crear Usuario Real**

1. Clerk Dashboard → Users → **"Add User"**
2. Email: `webhook-test-$(date +%s)@test.com`
3. Click "Create"

**Verificar en Supabase:**
```sql
SELECT * FROM users WHERE email LIKE 'webhook-test-%';
```

**✅ Si aparece:** Webhook funcionando correctamente

---

## 🚀 Solución Rápida (Si urgente)

Si necesitas que funcione YA y no puedes esperar:

### **Opción A: Script de Sync Manual**

```bash
# Ejecutar cada vez que un usuario se registre
npx tsx scripts/sync-clerk-users.ts
```

### **Opción B: Cron Job (Automático cada hora)**

1. Crear endpoint en `app/api/cron/sync/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Verificar authorization
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Ejecutar sync
  // ... código de sincronización ...

  return NextResponse.json({ success: true });
}
```

2. Configurar Cron en Vercel:
```
URL: /api/cron/sync
Schedule: 0 * * * * (cada hora)
```

---

## 📊 Verificación Post-Fix

Después de arreglar el webhook, verificar:

### **Día 1:**
- [ ] Crear 3 usuarios de prueba
- [ ] Verificar que todos aparecen en Supabase
- [ ] Verificar que logs en Clerk muestran `200 OK`
- [ ] Verificar que NO hay errores de foreign key

### **Semana 1:**
- [ ] Monitorear logs diariamente
- [ ] Verificar tasa de éxito del webhook (>99%)
- [ ] Confirmar que NO hay usuarios "huérfanos" (en Clerk pero no en Supabase)

---

## 🆘 Cuando Todo Falla

Si después de todo esto el webhook sigue sin funcionar:

### **Plan B: Middleware de Auto-Sync**

Agregar en cada endpoint de generación de CV:

```typescript
// Al inicio de POST /api/resume/generate:
await ensureUserExists(userId);

async function ensureUserExists(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (!user) {
    // Crear usuario desde Clerk
    const clerkUser = await getUserFromClerk(userId);
    await supabase.from('users').insert({
      id: userId,
      email: clerkUser.email,
      name: clerkUser.name,
      plan: 'free',
      credits_remaining: 1,
      credits_total: 1,
    });
  }
}
```

**Ventaja:** Funciona siempre, incluso si webhook falla
**Desventaja:** Más lento (query extra por request)

---

## 📞 Soporte

**Si nada funciona:**
- Check #1: ¿Estás editando el proyecto correcto en Clerk? (Production vs Development)
- Check #2: ¿Hiciste redeploy después de agregar variables?
- Check #3: ¿La URL es HTTPS? (no HTTP)

**Contacto:**
- Clerk Support: [https://clerk.com/support](https://clerk.com/support)
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)
- Email: resumesmart0@gmail.com

---

## ✅ Checklist Final

Antes de considerar el problema resuelto:

- [ ] Webhook configurado en Clerk Dashboard (URL correcta, eventos seleccionados)
- [ ] `CLERK_WEBHOOK_SECRET` agregado en Vercel
- [ ] Redeploy realizado después de agregar variable
- [ ] Test event enviado desde Clerk → `200 OK`
- [ ] Usuario de prueba creado → Aparece en Supabase
- [ ] Logs en Vercel muestran `[Clerk Webhook]` correctamente
- [ ] NO hay errores de foreign key al crear CVs
- [ ] Documentado el proceso para futuros problemas

---

**Good luck! 🚀**
