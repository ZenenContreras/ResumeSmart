# 🗑️ Solución: Usuarios No Se Eliminan de Supabase

**Problema:** Cuando eliminas un usuario en Clerk, NO se elimina de Supabase
**Causa:** Webhook no está funcionando o evento `user.deleted` no está configurado
**Impacto:** Usuarios "huérfanos" en Supabase

---

## 🔍 Por Qué Sucede

El webhook de Clerk debe enviar el evento `user.deleted` a tu servidor para que se elimine de Supabase. Si no funciona, hay 3 causas posibles:

1. **Webhook no configurado** (ver [WEBHOOK_TROUBLESHOOTING.md](WEBHOOK_TROUBLESHOOTING.md))
2. **Evento `user.deleted` NO seleccionado** en Clerk Dashboard
3. **Webhook configurado pero fallando**

---

## ✅ Solución Permanente

### **Paso 1: Verificar Evento en Clerk Dashboard**

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Tu proyecto → **"Webhooks"**
3. Click en tu webhook endpoint
4. Verificar que estos eventos estén **✓ seleccionados:**
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted` ← **IMPORTANTE**

**Si `user.deleted` no está marcado:**
- Click "Edit"
- Marcar `user.deleted`
- Save

---

### **Paso 2: Probar el Evento**

En Clerk Dashboard → Webhooks → Tu endpoint:

1. Click **"Send Test Event"**
2. Select: `user.deleted`
3. Click **"Send"**

**Verificar en Vercel Logs:**
```
[Clerk Webhook] 🔔 Webhook request received
[Clerk Webhook] 📨 Event type: user.deleted
[Webhook] 🗑️  Deleting user: user_xxx
[Webhook] Found user to delete: test@example.com
[Webhook] ✅ User deleted from Supabase: user_xxx
[Webhook] ✅ All related data deleted (CASCADE)
```

**✅ Si ves estos logs:** El delete está funcionando

---

## 🔧 Solución Temporal (Limpiar Huérfanos)

Si ya tienes usuarios huérfanos que no se eliminaron, usa el endpoint de admin para limpiarlos.

### **Configurar ADMIN_SECRET (una sola vez)**

1. **En Vercel:**
   ```
   Settings → Environment Variables → Add
   Name: ADMIN_SECRET
   Value: [genera un password fuerte, ej: openssl rand -hex 32]
   Environment: Production ✅
   ```

2. **Redeploy** después de agregar la variable

---

### **Uso del Endpoint Admin**

#### **1. Ver Estado Actual (Sin Hacer Cambios)**

```bash
curl -X GET https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

**Respuesta:**
```json
{
  "clerkUsersCount": 50,
  "supabaseUsersCount": 55,
  "inSync": false,
  "missingInSupabase": 2,
  "orphanedInSupabase": 7,
  "details": {
    "missing": [
      { "id": "user_abc", "email": "new@example.com" }
    ],
    "orphaned": [
      { "id": "user_xyz", "email": "deleted@example.com" }
    ]
  }
}
```

**Interpretar:**
- `missingInSupabase`: Usuarios en Clerk que faltan en Supabase → Se crearán
- `orphanedInSupabase`: Usuarios en Supabase que ya no existen en Clerk → Se eliminarán

---

#### **2. Sincronizar (Aplicar Cambios)**

```bash
curl -X POST https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"action": "sync"}'
```

**Respuesta:**
```json
{
  "clerkUsersCount": 50,
  "supabaseUsersCount": 50,
  "missingInSupabase": [],
  "orphanedInSupabase": [],
  "actions": [
    {
      "type": "create",
      "userId": "user_abc",
      "email": "new@example.com",
      "status": "success"
    },
    {
      "type": "delete",
      "userId": "user_xyz",
      "email": "deleted@example.com",
      "status": "success"
    }
  ]
}
```

**Esto:**
- ✅ Crea usuarios faltantes en Supabase
- ✅ Elimina usuarios huérfanos de Supabase
- ✅ Mantiene Clerk y Supabase sincronizados

---

## 🔐 Row Level Security (RLS) Check

Si el webhook llega pero el delete falla, puede ser por RLS en Supabase.

### **Verificar RLS Policies**

En Supabase SQL Editor:

```sql
-- Ver políticas actuales
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';
```

**Problema común:**
- RLS está habilitado (`ALTER TABLE users ENABLE ROW LEVEL SECURITY`)
- Pero NO hay política para `DELETE` con `SERVICE ROLE`

**Solución:**

```sql
-- Asegurar que el SERVICE ROLE puede eliminar
-- (supabaseAdmin usa SERVICE ROLE, no auth.uid())
-- Ya debería estar configurado, pero verificar:

-- Ver si RLS está habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'users';

-- Si rowsecurity = true, asegurar que bypasses RLS para service role
-- (Service role automáticamente bypasses RLS, no necesitas policy)
```

**Nota:** `supabaseAdmin` usa el `SERVICE_ROLE_KEY` que automáticamente bypasea RLS. Si aún falla, revisa los logs para ver el error exacto.

---

## 📊 Verificación Post-Fix

### **Test 1: Eliminar Usuario de Prueba**

1. **Crear usuario en Clerk:**
   ```
   Email: delete-test@test.com
   ```

2. **Verificar que se creó en Supabase:**
   ```sql
   SELECT * FROM users WHERE email = 'delete-test@test.com';
   ```

3. **Eliminar usuario en Clerk Dashboard**

4. **Verificar logs en Vercel** (debe aparecer en 5 segundos):
   ```
   [Webhook] 🗑️  Deleting user: user_xxx
   [Webhook] ✅ User deleted from Supabase
   ```

5. **Verificar en Supabase:**
   ```sql
   SELECT * FROM users WHERE email = 'delete-test@test.com';
   -- Debe retornar: 0 rows
   ```

**✅ Si el usuario desapareció:** Funcionando correctamente

---

### **Test 2: Verificar CASCADE Delete**

Cuando eliminas un usuario, también deben eliminarse:
- ✅ Sus resumes (tabla `resumes`)
- ✅ Sus cover letters (tabla `cover_letters`)
- ✅ Resume versions (tabla `resume_versions`)

**Verificar en schema.sql:**
```sql
-- Esto debe estar en tu schema:
CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE
```

**Si NO dice `ON DELETE CASCADE`, actualizar:**
```sql
-- Eliminar constraint vieja
ALTER TABLE resumes DROP CONSTRAINT resumes_user_id_fkey;

-- Agregar constraint nueva con CASCADE
ALTER TABLE resumes ADD CONSTRAINT resumes_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Repetir para cover_letters
ALTER TABLE cover_letters DROP CONSTRAINT cover_letters_user_id_fkey;
ALTER TABLE cover_letters ADD CONSTRAINT cover_letters_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

---

## 🚨 Troubleshooting

### **Problema: Webhook llega pero delete falla**

**Logs en Vercel:**
```
[Webhook] ❌ Error deleting user: ...
```

**Causas posibles:**

1. **Foreign key sin CASCADE:**
   ```
   Error: update or delete on table "users" violates foreign key constraint
   ```
   **Solución:** Agregar `ON DELETE CASCADE` (ver arriba)

2. **RLS bloqueando:**
   ```
   Error: new row violates row-level security policy
   ```
   **Solución:** Verificar que usas `supabaseAdmin` (SERVICE_ROLE), no `supabase` (ANON_KEY)

3. **Usuario no existe:**
   ```
   [Webhook] ⚠️  User not found in Supabase, skipping delete
   ```
   **Solución:** Normal, significa que nunca se creó o ya se eliminó

---

### **Problema: Muchos usuarios huérfanos acumulados**

**Síntoma:** Tienes cientos de usuarios en Supabase que ya no existen en Clerk

**Causa:** El webhook no funcionó por semanas/meses

**Solución:**

```bash
# 1. Ver cuántos huérfanos hay
curl -X GET https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"

# 2. Si hay muchos (>50), hacer sync por lotes
# Ejecutar 3-4 veces con 5 minutos de diferencia
curl -X POST https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"action": "sync"}'

# Esperar 5 minutos...

# 3. Verificar que quedó en 0
curl -X GET https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

---

## 📋 Checklist de Resolución

- [ ] Verificar evento `user.deleted` seleccionado en Clerk
- [ ] Enviar test event de `user.deleted` desde Clerk
- [ ] Verificar logs en Vercel (debe mostrar delete exitoso)
- [ ] Verificar `ON DELETE CASCADE` en foreign keys
- [ ] Ejecutar sync-users para limpiar huérfanos existentes
- [ ] Crear usuario de prueba y eliminarlo (test end-to-end)
- [ ] Verificar que usuario desaparece de Supabase
- [ ] Verificar que resumes también se eliminan (CASCADE)

---

## 🔄 Mantenimiento

**Frecuencia recomendada:** Revisar cada semana

```bash
# Verificar si hay discrepancias
curl -X GET https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"

# Si inSync = false, ejecutar sync
curl -X POST https://your-app.vercel.app/api/admin/sync-users \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"action": "sync"}'
```

---

## 🎯 Resumen

**Problema:** Usuarios no se eliminan de Supabase
**Causa principal:** Evento `user.deleted` no configurado en webhook
**Solución rápida:** Endpoint admin para limpiar huérfanos
**Solución permanente:** Configurar webhook correctamente

**Archivos modificados:**
- ✅ [app/api/auth/webhook/route.ts](../app/api/auth/webhook/route.ts) - Logging mejorado
- ✅ [app/api/admin/sync-users/route.ts](../app/api/admin/sync-users/route.ts) - Nuevo endpoint
- ✅ [docs/USER_DELETION_FIX.md](USER_DELETION_FIX.md) - Esta guía

---

**¿Todo funcionando? ✅**
