# Guía: Cómo Agregar Nuevos Templates

Esta guía explica cómo agregar nuevos templates de resume de forma consistente al sistema.

## 📋 Pasos para Agregar un Nuevo Template

### 1. Crear el Archivo de Estilos Compartidos

Crear un nuevo archivo en `/lib/styles/` siguiendo el patrón:

```typescript
// /lib/styles/nuevo-template-styles.ts

export const NUEVO_TEMPLATE_COLORS = {
  primary: '#color-principal',
  // ... otros colores
} as const;

export const NUEVO_TEMPLATE_SPACING = {
  pageWidth: 794, // A4 width: 210mm = 8.27 inches at 96 DPI
  pageMinHeight: 1123, // A4 height: 297mm = 11.69 inches at 96 DPI
  // ... otros espaciados
} as const;

export const NUEVO_TEMPLATE_TYPOGRAPHY = {
  fontFamily: {
    preview: 'Font Name, sans-serif',
    pdf: 'Font Name',
  },
  // ... otros valores tipográficos
} as const;

export function getPreviewStyles() {
  return {
    container: { /* ... */ },
    // ... estilos para HTML/React
  };
}

export function getPDFStyles() {
  return {
    page: { /* ... */ },
    // ... estilos para @react-pdf/renderer
  };
}
```

**Ejemplo de archivos existentes:**
- `harvard-ats-styles.ts` - ATS optimizado, blanco y negro
- `modern-styles.ts` - Moderno con azul (#2563eb)
- `purple-executive-styles.ts` - Ejecutivo con morado (#7c3aed)
- `blue-corporate-styles.ts` - Corporativo con sidebar azul (#1e3a8a)

### 2. Crear el Template de Preview (HTML/React)

Crear archivo en `/components/resume-editor/templates/`:

```typescript
// /components/resume-editor/templates/NuevoTemplatePreview.tsx

import React from 'react';
import { ResumeData } from '@/lib/types/resume';
import { getPreviewStyles } from '@/lib/styles/nuevo-template-styles';

interface NuevoTemplatePreviewProps {
  data: ResumeData;
}

export function NuevoTemplatePreview({ data }: NuevoTemplatePreviewProps) {
  const { personalInfo, summary, experience, education, skills, /* ... */ } = data;
  const styles = getPreviewStyles();

  return (
    <div data-resume-preview style={styles.container}>
      {/* Renderizar todas las secciones usando styles */}
    </div>
  );
}
```

### 3. Crear el Template de PDF

Crear archivo en `/components/pdf-templates/`:

```typescript
// /components/pdf-templates/NuevoTemplateTemplate.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getPDFStyles } from '@/lib/styles/nuevo-template-styles';
import { ResumeData } from '@/lib/types/resume';

const styles = StyleSheet.create(getPDFStyles());

interface NuevoTemplateTemplateProps {
  data: ResumeData;
}

const NuevoTemplateTemplate: React.FC<NuevoTemplateTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, /* ... */ } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Renderizar todas las secciones usando styles */}
      </Page>
    </Document>
  );
};

export default NuevoTemplateTemplate;
```

### 4. Registrar el Template en los Tipos

Actualizar `/lib/types/resume.ts`:

```typescript
// 1. Agregar el ID al tipo
export type TemplateId = 'harvard-ats' | 'modern' | 'purple-executive' | 'blue-corporate' | 'nuevo-template';

// 2. Agregar a AVAILABLE_TEMPLATES
export const AVAILABLE_TEMPLATES: TemplateInfo[] = [
  // ... templates existentes
  {
    id: 'nuevo-template',
    name: 'Nombre del Template',
    description: 'Descripción breve y atractiva',
    color: '#color-primario', // Color principal del template
    styleFile: 'nuevo-template-styles',
    features: [
      'Característica 1',
      'Característica 2',
      'Característica 3',
    ]
  }
];
```

### 5. (Opcional) Actualizar Preview Card

Si el template tiene un diseño único que no se adapta a los existentes, actualizar `/lib/utils/template-preview.tsx`:

```typescript
export function TemplatePreviewCard({ templateId, color }: TemplatePreviewProps) {
  // ... casos existentes

  if (templateId === 'nuevo-template') {
    return (
      <div className="w-full h-full bg-white p-3">
        {/* Diseño visual simplificado del template */}
      </div>
    );
  }

  // ... fallback por defecto
}
```

## ✅ Checklist de Verificación

Antes de considerar completo un nuevo template, verificar:

- [ ] **Estilos compartidos** creados en `/lib/styles/`
- [ ] **Preview template** creado en `/components/resume-editor/templates/`
- [ ] **PDF template** creado en `/components/pdf-templates/`
- [ ] **Template registrado** en `/lib/types/resume.ts`
- [ ] **Ambos templates usan** `ResumeData` de `/lib/types/resume.ts`
- [ ] **Ambos templates usan** estilos compartidos (no duplicados)
- [ ] **Títulos de secciones** son consistentes entre Preview y PDF
- [ ] **Sin errores de TypeScript** (`npx tsc --noEmit`)
- [ ] **Servidor Next.js** compila sin errores
- [ ] **Template aparece** en `/dashboard/create/select-template`
- [ ] **Preview visual** se muestra correctamente en la selección
- [ ] **Editor funciona** correctamente con el template
- [ ] **PDF se genera** correctamente y coincide con el preview

## 🎨 Secciones Estándar a Incluir

Todos los templates deben soportar estas secciones (aunque algunas sean opcionales):

**Obligatorias:**
- Personal Info (name, email, phone, location, linkedin, website, portfolio, github)
- Summary
- Experience
- Education
- Skills

**Opcionales (pero recomendadas):**
- Certifications
- Languages
- Projects
- Publications
- Volunteer Work
- Awards & Honors

## 📝 Convenciones de Nomenclatura

- **Style file**: `template-name-styles.ts` (kebab-case)
- **Preview component**: `TemplateNamePreview.tsx` (PascalCase)
- **PDF component**: `TemplateNameTemplate.tsx` (PascalCase)
- **Template ID**: `'template-name'` (kebab-case)

## 🔄 Sistema Escalable

El sistema actual está diseñado para ser **completamente escalable**:

1. **Un solo lugar** para registrar templates: `/lib/types/resume.ts`
2. **Preview cards automáticas** basadas en el color del template
3. **Interfaz única** `ResumeData` para todos los templates
4. **Estilos compartidos** entre Preview y PDF para cada template

Esto significa que al agregar un nuevo template:
- ✅ Aparecerá automáticamente en la página de selección
- ✅ Tendrá un preview visual generado automáticamente
- ✅ Usará los mismos tipos de datos que todos los demás
- ✅ Será consistente entre editor y PDF

## 🚀 Beneficios de este Sistema

1. **Mantenibilidad**: Un cambio en `ResumeData` afecta a todos los templates
2. **Consistencia**: Todos los templates usan los mismos datos y estructura
3. **Escalabilidad**: Agregar templates nuevos es rápido y simple
4. **Sin duplicación**: Estilos compartidos entre Preview y PDF
5. **Type Safety**: TypeScript garantiza que no falten campos

---

**Última actualización**: 2025-10-14
