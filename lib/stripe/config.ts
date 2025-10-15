export const STRIPE_PLANS = {
  pro: {
    amount: 1900, // $19.00 en centavos
    currency: 'usd',
    product_name: 'ResumeSmart Pro',
    description: '10 CVs + Cover Letters',
    credits: 10,
  },
  ultimate: {
    amount: 4900, // $49.00
    currency: 'usd',
    product_name: 'ResumeSmart Ultimate',
    description: '90 días acceso ilimitado',
    credits: 999, // Unlimited represented as large number
    durationDays: 90,
  },
} as const;

export type StripePlanType = keyof typeof STRIPE_PLANS;
