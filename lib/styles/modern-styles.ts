/**
 * Modern Template - Shared Style Definitions
 * These values are used by both Preview (HTML) and PDF templates
 * to ensure consistency between what users see and what they download
 */

export const MODERN_COLORS = {
  primary: '#2563eb',
  dark: '#1f2937',
  gray: '#6b7280',
  mediumGray: '#374151',
  lightGray: '#e5e7eb',
  white: '#ffffff',
} as const;

export const MODERN_SPACING = {
  pageWidth: 794, // A4 width: 210mm = 8.27 inches at 96 DPI
  pageMinHeight: 1123, // A4 height: 297mm = 11.69 inches at 96 DPI
  pagePadding: 40,
  sectionMarginBottom: 15,
  headerMarginBottom: 20,
  itemMarginBottom: 12,
  smallGap: 3,
  mediumGap: 8,
  largeGap: 10,
} as const;

export const MODERN_TYPOGRAPHY = {
  fontFamily: {
    preview: 'Helvetica, Arial, sans-serif',
    pdf: 'Helvetica',
  },
  fontSize: {
    name: 24,
    sectionTitle: 14,
    jobTitle: 12,
    body: 11,
    contact: 10,
    small: 10,
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
  lineHeight: 1.5,
  letterSpacing: {
    sectionTitle: 0.5,
  },
} as const;

export const MODERN_BORDERS = {
  headerBorder: '2px solid #2563eb',
  sectionBorder: '1px solid #e5e7eb',
  headerBorderPDF: {
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
  },
  sectionBorderPDF: {
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
  },
} as const;

/**
 * Helper function to convert shared styles to inline CSS for Preview templates
 */
export function getPreviewStyles() {
  return {
    container: {
      width: `${MODERN_SPACING.pageWidth}px`,
      minHeight: `${MODERN_SPACING.pageMinHeight}px`,
      padding: `${MODERN_SPACING.pagePadding}px`,
      fontFamily: MODERN_TYPOGRAPHY.fontFamily.preview,
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.body}pt`,
      lineHeight: MODERN_TYPOGRAPHY.lineHeight,
      backgroundColor: MODERN_COLORS.white,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      margin: '0 auto',
    },
    header: {
      marginBottom: `${MODERN_SPACING.headerMarginBottom}px`,
      borderBottom: MODERN_BORDERS.headerBorder,
      paddingBottom: '10px',
    },
    name: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.name}pt`,
      fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
      color: MODERN_COLORS.dark,
      marginBottom: '5px',
    },
    contactInfo: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.contact}pt`,
      color: MODERN_COLORS.gray,
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${MODERN_SPACING.largeGap}px`,
    },
    contactItem: {
      marginRight: '15px',
    },
    section: {
      marginBottom: `${MODERN_SPACING.sectionMarginBottom}px`,
    },
    sectionTitle: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.sectionTitle}pt`,
      fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
      color: MODERN_COLORS.dark,
      marginBottom: `${MODERN_SPACING.mediumGap}px`,
      borderBottom: MODERN_BORDERS.sectionBorder,
      paddingBottom: '4px',
      textTransform: 'uppercase' as const,
      letterSpacing: `${MODERN_TYPOGRAPHY.letterSpacing.sectionTitle}px`,
    },
    summary: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.body}pt`,
      color: MODERN_COLORS.mediumGray,
      marginBottom: '10px',
      textAlign: 'justify' as const,
    },
    experienceItem: {
      marginBottom: `${MODERN_SPACING.itemMarginBottom}px`,
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
    },
    jobTitle: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
      color: MODERN_COLORS.dark,
    },
    company: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.body}pt`,
      color: MODERN_COLORS.primary,
      marginBottom: '2px',
    },
    location: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.small}pt`,
      color: MODERN_COLORS.gray,
    },
    dateRange: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.small}pt`,
      color: MODERN_COLORS.gray,
    },
    responsibilities: {
      marginTop: '4px',
    },
    bullet: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.small}pt`,
      color: MODERN_COLORS.mediumGray,
      marginLeft: '15px',
      marginBottom: `${MODERN_SPACING.smallGap}px`,
      display: 'flex',
    },
    bulletPoint: {
      marginRight: '5px',
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: '10px',
    },
    degree: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
      color: MODERN_COLORS.dark,
    },
    institution: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.body}pt`,
      color: MODERN_COLORS.primary,
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${MODERN_SPACING.largeGap}px`,
    },
    skillCategory: {
      marginBottom: `${MODERN_SPACING.mediumGap}px`,
    },
    skillCategoryTitle: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.body}pt`,
      fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
      color: MODERN_COLORS.dark,
      marginBottom: '4px',
    },
    skillsList: {
      fontSize: `${MODERN_TYPOGRAPHY.fontSize.small}pt`,
      color: MODERN_COLORS.mediumGray,
    },
  };
}

/**
 * Helper function to get PDF-compatible StyleSheet object
 * Use with: StyleSheet.create(getPDFStyles())
 */
export function getPDFStyles() {
  return {
    page: {
      padding: MODERN_SPACING.pagePadding,
      fontSize: MODERN_TYPOGRAPHY.fontSize.body,
      fontFamily: MODERN_TYPOGRAPHY.fontFamily.pdf,
      lineHeight: MODERN_TYPOGRAPHY.lineHeight,
    },
    header: {
      marginBottom: MODERN_SPACING.headerMarginBottom,
      ...MODERN_BORDERS.headerBorderPDF,
    },
    name: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.name,
      fontWeight: 'bold' as const,
      color: MODERN_COLORS.dark,
      marginBottom: 5,
    },
    contactInfo: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.contact,
      color: MODERN_COLORS.gray,
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    contactItem: {
      marginRight: 15,
    },
    section: {
      marginBottom: MODERN_SPACING.sectionMarginBottom,
    },
    sectionTitle: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.sectionTitle,
      fontWeight: 'bold' as const,
      color: MODERN_COLORS.dark,
      marginBottom: MODERN_SPACING.mediumGap,
      textTransform: 'uppercase' as const,
      letterSpacing: MODERN_TYPOGRAPHY.letterSpacing.sectionTitle,
      ...MODERN_BORDERS.sectionBorderPDF,
    },
    summary: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.body,
      color: MODERN_COLORS.mediumGray,
      marginBottom: 10,
      textAlign: 'justify' as const,
    },
    experienceItem: {
      marginBottom: MODERN_SPACING.itemMarginBottom,
    },
    experienceHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: MODERN_COLORS.dark,
    },
    company: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.body,
      color: MODERN_COLORS.primary,
      marginBottom: 2,
    },
    location: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.small,
      color: MODERN_COLORS.gray,
    },
    dateRange: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.small,
      color: MODERN_COLORS.gray,
    },
    responsibilities: {
      marginTop: 4,
    },
    bullet: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.small,
      color: MODERN_COLORS.mediumGray,
      marginLeft: 15,
      marginBottom: MODERN_SPACING.smallGap,
      flexDirection: 'row' as const,
    },
    bulletPoint: {
      marginRight: 5,
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: 10,
    },
    degree: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: MODERN_COLORS.dark,
    },
    institution: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.body,
      color: MODERN_COLORS.primary,
    },
    skillsContainer: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    skillCategory: {
      marginBottom: MODERN_SPACING.mediumGap,
    },
    skillCategoryTitle: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.body,
      fontWeight: 'bold' as const,
      color: MODERN_COLORS.dark,
      marginBottom: 4,
    },
    skillsList: {
      fontSize: MODERN_TYPOGRAPHY.fontSize.small,
      color: MODERN_COLORS.mediumGray,
    },
  };
}
