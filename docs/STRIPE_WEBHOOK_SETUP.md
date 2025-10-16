# 🎯 Guía Completa: Configuración Stripe Webhook

## 📋 Tabla de Contenidos
1. [Resumen del Sistema](#resumen-del-sistema)
2. [Configuración en Stripe Dashboard](#configuración-en-stripe-dashboard)
3. [Variables de Entorno](#variables-de-entorno)
4. [Testing Local](#testing-local)
5. [Testing en Producción](#testing-en-producción)
6. [Troubleshooting](#troubleshooting)

---

## 🏗️ Resumen del Sistema

### **Arquitectura de Pagos:**

```
Usuario → Checkout → Stripe → Webhook → Supabase → Usuario actualizado
```

### **Planes Disponibles:**

| Plan | Precio | Créditos | Duración | Descripción |
|------|--------|----------|----------|-------------|
| **FREE** | $0 | 1 CV/mes | Forever | 1 CV con IA, edición y download ilimitado |
| **PRO** | $19 | 10 CVs | One-time | 10 CVs + Cover Letters |
| **ULTIMATE** | $49 | Unlimited | 90 días | Acceso ilimitado por 90 días |

---

## 🔧 Configuración en Stripe Dashboard

### **Paso 1: Acceder a Stripe Dashboard**

1. Ve a: https://dashboard.stripe.com/test/webhooks
2. Asegúrate de estar en **Test Mode** (toggle arriba a la derecha)

---

### **Paso 2: Crear Webhook Endpoint**

1. Click en **"Add endpoint"**

2. **Endpoint URL:**
   ```
   https://krysta-unspasmodic-natosha.ngrok-free.dev/api/stripe/webhook
   ```

   > **Nota:** Esta es tu URL actual de ngrok del `.env.local`

3. **Description (opcional):**
   ```
   ResumeSmart Webhook - Test Environment
   ```

4. **Select events to listen to:**

   Click en "Select events" y busca estos 3 eventos:

   ```
   ✅ checkout.session.completed
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ```

5. **API version:**
   - Selecciona **"Latest API version"**

6. Click en **"Add endpoint"**

---

### **Paso 3: Copiar el Webhook Secret**

1. Después de crear el endpoint, verás un panel con los detalles

2. En la sección **"Signing secret"**, click en **"Reveal"**

3. Copia el secret que se ve así:
   ```
   whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Guárdalo en tu `.env.local`:**

   Abre `/Users/zenencontrerasroyero/Desktop/ResumeSmart/.env.local`

   Reemplaza la línea 21:
   ```env
   # ❌ ANTES:
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

   # ✅ DESPUÉS (con tu secret real):
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. **Guarda el archivo** y reinicia el servidor:
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

---

## 🔐 Variables de Entorno

### **Verificar `.env.local`:**

Tu archivo debe tener estas variables de Stripe:

```env
# Stripe Keys
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://krysta-unspasmodic-natosha.ngrok-free.dev
```

### **Importante:**
- `STRIPE_SECRET_KEY`: Ya está configurado ✅
- `STRIPE_WEBHOOK_SECRET`: **DEBES actualizarlo con el secret de Stripe Dashboard**
- `NEXT_PUBLIC_APP_URL`: Ya está configurado con tu ngrok URL ✅

---

## 🧪 Testing Local

### **Opción 1: Stripe CLI (Recomendado)**

1. **Instalar Stripe CLI:**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # O descargar desde:
   # https://stripe.com/docs/stripe-cli
   ```

2. **Login a tu cuenta Stripe:**
   ```bash
   stripe login
   ```

   Se abrirá el navegador para autenticarte.

3. **Escuchar webhooks localmente:**
   ```bash
   stripe listen --forward-to localhost:3002/api/stripe/webhook
   ```

   Verás un output como:
   ```
   > Ready! Your webhook signing secret is whsec_xxxxxx (^C to quit)
   ```

4. **Copiar el webhook secret temporal** y actualizar `.env.local`

5. **En otra terminal, trigger un evento de prueba:**
   ```bash
   stripe trigger checkout.session.completed
   ```

6. **Verificar logs en tu consola de Next.js:**
   ```
   ✅ Stripe webhook received: checkout.session.completed
   💳 Processing payment for user user_xxx, plan: pro
   ✅ User user_xxx upgraded from free to pro with 10 credits
   ```

---

### **Opción 2: Testing con ngrok**

1. **Asegurarte que ngrok está corriendo:**
   ```bash
   ngrok http 3002
   ```

2. **Copiar la URL de ngrok** (ej: `https://xxxx.ngrok-free.dev`)

3. **Actualizar `.env.local`:**
   ```env
   NEXT_PUBLIC_APP_URL=https://xxxx.ngrok-free.dev
   ```

4. **Actualizar el endpoint en Stripe Dashboard** con la nueva URL de ngrok

5. **Crear un pago de prueba:**
   - Ir a tu app: `https://xxxx.ngrok-free.dev/dashboard/upgrade`
   - Click en "Upgrade to Pro"
   - Usar tarjeta de prueba: `4242 4242 4242 4242`
   - Cualquier fecha futura
   - Cualquier CVC

6. **Verificar en Stripe Dashboard:**
   - Ir a: https://dashboard.stripe.com/test/webhooks
   - Click en tu endpoint
   - Ver los eventos recibidos

---

## 🚀 Testing en Producción

### **Cuando despliegues a producción (Vercel/etc):**

1. **Actualizar variables de entorno en tu hosting:**
   ```env
   STRIPE_SECRET_KEY=xxxxxx # ⚠️ Usa LIVE key
   STRIPE_WEBHOOK_SECRET=xxxxxxx # Nuevo secret de producción
   NEXT_PUBLIC_APP_URL=https://resumesmart.io  # Tu dominio real
   ```

2. **Crear nuevo webhook endpoint en Stripe:**
   - Ir a: https://dashboard.stripe.com/webhooks (modo LIVE)
   - Crear endpoint con tu URL de producción
   - Usar el nuevo webhook secret

3. **Cambiar a Test Mode → Live Mode** en Stripe Dashboard

---

## 🔍 Verificar que Todo Funciona

### **Checklist de Pruebas:**

```bash
# 1. ✅ Verificar que el servidor está corriendo
http://localhost:3002

# 2. ✅ Probar creación de sesión de checkout
curl -X POST http://localhost:3002/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan": "pro"}' \
  -H "Cookie: __clerk_db_jwt=YOUR_TOKEN"

# 3. ✅ Verificar webhook endpoint responde
curl -X POST http://localhost:3002/api/stripe/webhook \
  -H "Content-Type: application/json" \
  -d '{"type": "test"}'

# Debería retornar: {"error":"Missing stripe-signature header"}
# Esto es CORRECTO - significa que el endpoint existe

# 4. ✅ Verificar plan del usuario
curl http://localhost:3002/api/user/plan \
  -H "Cookie: __clerk_db_jwt=YOUR_TOKEN"

# Debería retornar:
# {
#   "plan": "free",
#   "creditsRemaining": 1,
#   "creditsTotal": 1
# }
```

---

## 📊 Flujo Completo de Pago (Diagrama)

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuario en /dashboard/upgrade                       │
│    Click: "Upgrade to Pro - $19"                        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Frontend → POST /api/stripe/checkout                │
│    Body: { plan: "pro" }                                │
│    Headers: Cookie con auth de Clerk                    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Backend crea Stripe Checkout Session                │
│    Metadata: { userId, plan: "pro", credits: "10" }    │
│    Success URL: /success?session_id={ID}               │
│    Cancel URL: /dashboard/upgrade?canceled=true        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Usuario redirigido a Stripe Checkout                │
│    https://checkout.stripe.com/c/pay/xxx                │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Usuario ingresa datos de pago                       │
│    Test card: 4242 4242 4242 4242                      │
│    Expiry: 12/34, CVC: 123                             │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Stripe procesa pago exitosamente                    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Stripe envía webhook                                │
│    POST /api/stripe/webhook                             │
│    Event: checkout.session.completed                    │
│    Signature: stripe-signature header                   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 8. Backend verifica firma del webhook                  │
│    stripe.webhooks.constructEvent(body, sig, secret)   │
│    ✅ Firma válida → Continuar                         │
│    ❌ Firma inválida → Rechazar                        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 9. Backend actualiza Supabase                          │
│    UPDATE users SET                                     │
│      plan = 'pro',                                      │
│      credits_remaining = 10,                            │
│      credits_total = 10,                                │
│      purchased_at = NOW(),                              │
│      stripe_customer_id = 'cus_xxx'                     │
│    WHERE id = userId                                    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 10. Usuario redirigido a /success                      │
│     Muestra: "¡Pago exitoso! Ya tienes acceso Pro"     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 11. Usuario va a /dashboard                            │
│     TopNav muestra: ⚡ 10 / 10 CVs [PRO]               │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### **Error: "Invalid signature"**

**Problema:** El webhook secret no coincide

**Solución:**
1. Verificar que el `STRIPE_WEBHOOK_SECRET` en `.env.local` es correcto
2. Copiar nuevamente desde Stripe Dashboard
3. Reiniciar el servidor de Next.js

```bash
# Verificar la variable
echo $STRIPE_WEBHOOK_SECRET

# Reiniciar servidor
# Ctrl+C
npm run dev
```

---

### **Error: "Missing stripe-signature header"**

**Problema:** La petición no viene de Stripe o falta el header

**Solución:**
- Este error es NORMAL si intentas llamar al webhook manualmente
- Solo Stripe puede enviar el header `stripe-signature` correcto
- Usa `stripe trigger` o crea un pago real de prueba

---

### **Error: "User not found"**

**Problema:** El userId en metadata no existe en Supabase

**Solución:**
1. Verificar que el usuario está autenticado con Clerk
2. Verificar que el userId se está pasando correctamente al crear el checkout

```typescript
// En /api/stripe/checkout/route.ts
metadata: {
  userId,  // ← Debe venir de auth()
  plan,
  credits: planConfig.credits.toString(),
}
```

---

### **Webhook no se dispara**

**Problema:** El webhook no llega a tu servidor

**Soluciones:**

1. **Verificar ngrok está corriendo:**
   ```bash
   ngrok http 3002
   ```

2. **Verificar el endpoint en Stripe Dashboard:**
   - Debe ser la URL exacta de ngrok + `/api/stripe/webhook`
   - Verificar que los eventos están seleccionados

3. **Ver logs en Stripe Dashboard:**
   - Ir a tu webhook endpoint
   - Click en "Events"
   - Ver si hay errores (4xx, 5xx)

4. **Ver logs del servidor Next.js:**
   ```bash
   # Debe mostrar cuando llega un webhook:
   ✅ Stripe webhook received: checkout.session.completed
   ```

---

### **Pago exitoso pero usuario no se actualiza**

**Problema:** El webhook llega pero la actualización falla

**Solución:**

1. **Verificar logs en consola del servidor:**
   ```
   Error updating user: {...}
   ```

2. **Verificar conexión a Supabase:**
   ```typescript
   // Probar en terminal de Supabase
   SELECT * FROM users WHERE id = 'user_xxx';
   ```

3. **Verificar permisos de Supabase:**
   - El `SUPABASE_SERVICE_KEY` debe tener permisos de escritura
   - Verificar RLS (Row Level Security) policies

---

## 📝 Testing Manual Completo

### **Script de Testing:**

```bash
# 1. Asegurarse que todo está configurado
cat .env.local | grep STRIPE
# Debe mostrar:
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_APP_URL=https://...ngrok...

# 2. Iniciar el servidor
npm run dev

# 3. En otra terminal, iniciar Stripe CLI
stripe listen --forward-to localhost:3002/api/stripe/webhook

# 4. En otra terminal, trigger evento
stripe trigger checkout.session.completed

# 5. Verificar en consola de Next.js:
# ✅ Stripe webhook received: checkout.session.completed
# 💳 Processing payment for user...
# ✅ User upgraded from free to pro with 10 credits

# 6. Verificar en Supabase:
# SELECT plan, credits_remaining FROM users WHERE id = 'user_xxx';
# Debe mostrar: plan='pro', credits_remaining=10
```

---

## ✅ Checklist Final

Antes de ir a producción, verificar:

- [ ] Webhook endpoint creado en Stripe Dashboard (Test mode)
- [ ] Webhook secret copiado a `.env.local`
- [ ] Eventos seleccionados: `checkout.session.completed`, `customer.subscription.*`
- [ ] ngrok corriendo y URL actualizada en Stripe
- [ ] Servidor Next.js corriendo
- [ ] Pago de prueba completado exitosamente
- [ ] Usuario actualizado correctamente en Supabase
- [ ] TopNav muestra créditos correctos
- [ ] Logs muestran el flujo completo

---

## 🚀 Go Live Checklist

Para producción:

- [ ] Cambiar Stripe a **Live Mode**
- [ ] Crear webhook en producción con URL real
- [ ] Actualizar variables de entorno en hosting
- [ ] Usar `STRIPE_SECRET_KEY` de Live (no Test)
- [ ] Usar nuevo `STRIPE_WEBHOOK_SECRET` de Live
- [ ] Testing con tarjetas reales (pequeño monto)
- [ ] Monitoreo de logs habilitado
- [ ] Alertas de Stripe configuradas

---

## 📚 Recursos

- [Stripe Webhooks Docs](https://stripe.com/docs/webhooks)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Ngrok Docs](https://ngrok.com/docs)

---

## 🆘 Soporte

Si tienes problemas:

1. Verificar logs en Stripe Dashboard
2. Verificar logs del servidor Next.js
3. Usar Stripe CLI para testing local
4. Revisar esta guía paso por paso

---

**Última actualización:** Octubre 2025
**Versión:** 1.0
