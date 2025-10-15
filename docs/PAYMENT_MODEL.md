# 💰 Modelo de Pagos ResumeSmart

## 🎯 **Sistema de Pagos Únicos (NO Suscripciones)**

ResumeSmart utiliza un modelo de **one-time payments** (pagos únicos), **NO suscripciones recurrentes**.

---

## 📊 **Planes Disponibles**

### **FREE Plan - $0**
```
Precio: GRATIS
Créditos: 1 CV/mes
Renovación: Automática cada mes
Duración: Forever
Tipo: Gratis

Incluye:
✅ 1 CV con IA por mes
✅ Ediciones ilimitadas
✅ Download PDF ilimitado
✅ Auto-save cada 5 segundos
✅ Botón "Mejorar" ilimitado
✅ ATS Score visible
✅ 3 templates

El crédito se renueva automáticamente cada 30 días
```

---

### **PRO Plan - $19 (ONE-TIME)**
```
Precio: $19 USD (pago único)
Créditos: 10 CVs
Renovación: NO SE RENUEVA
Duración: SIN EXPIRACIÓN
Tipo: One-Time Payment

Incluye TODO de FREE, más:
✅ 10 CVs con IA (PERMANENTES)
✅ Cover Letters
✅ 15 templates
✅ Export a DOCX

Los 10 CVs NUNCA expiran
Una vez usados, el usuario debe comprar más créditos
No hay renovación automática
```

---

### **ULTIMATE Plan - $49 (ONE-TIME)**
```
Precio: $49 USD (pago único)
Créditos: ILIMITADOS
Renovación: NO SE RENUEVA
Duración: 90 DÍAS
Tipo: One-Time Payment

Incluye TODO de PRO, más:
✅ CVs ILIMITADOS por 90 días
✅ Revisión humana
✅ Soporte prioritario
✅ Export a TXT

Después de 90 días:
❌ El plan EXPIRA automáticamente
❌ Usuario vuelve a plan FREE
❌ NO se cobra automáticamente
✅ Usuario puede comprar nuevo ULTIMATE si desea
```

---

## 🔄 **Flujos de Usuario**

### **Usuario FREE:**
```
1. Se registra → Recibe 1 crédito
2. Crea 1 CV → Gasta el crédito
3. Espera 30 días → Recibe 1 crédito nuevo
   O
   Compra PRO/ULTIMATE
```

### **Usuario PRO:**
```
1. Paga $19 (pago único)
2. Recibe 10 créditos permanentes
3. Usa los 10 CVs (puede tardar meses/años)
4. Se acaban los créditos → Debe comprar más
5. Los CVs creados son permanentes
```

### **Usuario ULTIMATE:**
```
1. Paga $49 (pago único)
2. Recibe CVs ilimitados por 90 días
3. Crea todos los CVs que quiera
4. Día 90 → Plan expira automáticamente
5. Usuario vuelve a FREE (1 CV/mes)
6. Todos los CVs creados se mantienen
7. Si quiere más → Debe comprar nuevo plan
```

---

## 🗄️ **Base de Datos: Tabla `users`**

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,

    -- Plan information
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'ultimate')),

    -- Credits
    credits_remaining INTEGER DEFAULT 1,
    credits_total INTEGER DEFAULT 1,

    -- Purchase tracking
    purchased_at TIMESTAMP,
    expires_at TIMESTAMP DEFAULT NULL,  -- Solo para ULTIMATE

    stripe_customer_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Campos Importantes:**

- **`expires_at`**:
  - `NULL` para FREE y PRO (nunca expiran)
  - `purchased_at + 90 days` para ULTIMATE

- **`credits_remaining`**:
  - FREE: 1 (se renueva cada mes)
  - PRO: 0-10 (nunca se renueva)
  - ULTIMATE: 999 (representa "ilimitado")

---

## ⚙️ **Lógica de Expiración**

### **Check de Expiración (ULTIMATE):**

```typescript
// Se ejecuta en:
// 1. Cada carga de página
// 2. Antes de crear un CV
// 3. Cron job diario

GET /api/user/check-expiration

Si plan === 'ultimate' && NOW() >= expires_at:
  1. Actualizar plan a 'free'
  2. Actualizar credits_remaining = 1
  3. Actualizar credits_total = 1
  4. Limpiar expires_at = NULL
  5. Notificar al usuario
```

### **Renovación de FREE:**

```typescript
// Cron job que se ejecuta diariamente

Para cada usuario con plan === 'free':
  Si han pasado 30 días desde purchased_at:
    1. Actualizar credits_remaining = 1
    2. Actualizar purchased_at = NOW()
```

---

## 💳 **Flujo de Pago con Stripe**

### **PRO - $19:**

```
1. Usuario click "Buy PRO"
2. Redirigido a Stripe Checkout
3. Paga $19 (one-time)
4. Stripe envía webhook: checkout.session.completed
5. Backend actualiza:
   - plan = 'pro'
   - credits_remaining = 10
   - credits_total = 10
   - purchased_at = NOW()
   - expires_at = NULL  ← NO EXPIRA
6. Usuario redirigido a /success
7. TopNav muestra: "⚡ 10 / 10 CVs [PRO]"
```

### **ULTIMATE - $49:**

```
1. Usuario click "Buy ULTIMATE"
2. Redirigido a Stripe Checkout
3. Paga $49 (one-time)
4. Stripe envía webhook: checkout.session.completed
5. Backend actualiza:
   - plan = 'ultimate'
   - credits_remaining = 999
   - credits_total = 999
   - purchased_at = NOW()
   - expires_at = NOW() + 90 days  ← EXPIRA EN 90 DÍAS
6. Usuario redirigido a /success
7. TopNav muestra: "✨ ∞ 85d left [ULTIMATE]"

[90 días después]

8. Sistema detecta expiración
9. Actualiza a FREE automáticamente
10. TopNav muestra: "⚡ 1 / 1 CVs [FREE]"
11. Notificación: "Your ULTIMATE plan has expired"
```

---

## 🚫 **Lo Que NO Hacemos**

❌ Suscripciones recurrentes
❌ Cobros automáticos mensuales
❌ Renovación automática de PRO/ULTIMATE
❌ Downgrade con reembolso
❌ Trial periods
❌ Cancelaciones (porque no hay suscripciones)

---

## ✅ **Lo Que SÍ Hacemos**

✅ Pagos únicos (one-time)
✅ PRO permanente (10 CVs que nunca expiran)
✅ ULTIMATE con expiración de 90 días
✅ Downgrade automático de ULTIMATE → FREE después de 90 días
✅ Renovación automática de crédito FREE (1 CV/mes)
✅ Usuario puede re-comprar cuando quiera

---

## 📅 **Configuración de Stripe**

### **Webhooks Necesarios:**

```
✅ checkout.session.completed
   → Procesar pago exitoso de PRO o ULTIMATE

❌ customer.subscription.updated
   → NO USAR (no tenemos suscripciones)

❌ customer.subscription.deleted
   → NO USAR (no tenemos suscripciones)
```

### **Metadata en Checkout Session:**

```typescript
metadata: {
  userId: string,        // ID de Clerk
  plan: 'pro' | 'ultimate',
  credits: string,       // '10' para PRO, '999' para ULTIMATE
  durationDays: string   // Solo para ULTIMATE: '90'
}
```

---

## 🔧 **Configuración Recomendada**

### **Variables de Entorno:**

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://tu-dominio.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...

# OpenAI
OPENAI_API_KEY=sk-proj-...
```

### **Cron Jobs Recomendados:**

```
1. Check Expiration (ULTIMATE)
   Frecuencia: Cada hora
   Endpoint: POST /api/user/check-expiration

2. Renew FREE Credits
   Frecuencia: Diaria a las 00:00 UTC
   Endpoint: POST /api/user/renew-free-credits

3. Send Expiration Warnings (ULTIMATE)
   Frecuencia: Diaria
   Condición: expires_at - NOW() < 7 days
   Acción: Enviar email de aviso
```

---

## 📈 **Métricas Importantes**

```typescript
// Tracking recomendado

1. Conversión FREE → PRO
2. Conversión FREE → ULTIMATE
3. Re-compra de PRO (usuarios que compraron PRO 2+ veces)
4. Re-compra de ULTIMATE (usuarios que compraron ULTIMATE 2+ veces)
5. Promedio de CVs creados por usuario PRO antes de agotar
6. Promedio de CVs creados por usuario ULTIMATE en 90 días
7. Retención después de expiración de ULTIMATE
```

---

## 🎯 **Resumen Visual**

```
┌──────────────────────────────────────────────────┐
│                    FREE PLAN                     │
├──────────────────────────────────────────────────┤
│ $0 forever                                       │
│ 1 CV/mes (auto-renewal)                         │
│ Ediciones/downloads ilimitados                   │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                    PRO PLAN                      │
├──────────────────────────────────────────────────┤
│ $19 ONE-TIME PAYMENT                             │
│ 10 CVs permanentes                               │
│ Sin expiración                                   │
│ No auto-renewal                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                 ULTIMATE PLAN                    │
├──────────────────────────────────────────────────┤
│ $49 ONE-TIME PAYMENT                             │
│ CVs ilimitados por 90 días                      │
│ Expira automáticamente → FREE                    │
│ No auto-renewal                                  │
└──────────────────────────────────────────────────┘
```

---

**Última actualización:** Octubre 2025
**Versión:** 2.0 - One-Time Payments Model
