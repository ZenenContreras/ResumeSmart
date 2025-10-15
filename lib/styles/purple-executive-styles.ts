/**
 * Purple Executive Template - Shared Style Definitions
 * These values are used by both Preview (HTML) and PDF templates
 * to ensure consistency between what users see and what they download
 */

export const PURPLE_EXECUTIVE_COLORS = {
  primary: '#7c3aed',
  dark: '#1f2937',
  gray: '#6b7280',
  mediumGray: '#4b5563',
  lightGray: '#374151',
  white: '#ffffff',
} as const;

export const PURPLE_EXECUTIVE_SPACING = {
  pageWidth: 794, // A4 width: 210mm = 8.27 inches at 96 DPI
  pageMinHeight: 1123, // A4 height: 297mm = 11.69 inches at 96 DPI
  pagePadding: 40,
  sectionMarginBottom: 16,
  headerMarginBottom: 20,
  itemMarginBottom: 14,
  smallGap: 4,
  mediumGap: 10,
  largeGap: 15,
} as const;

export const PURPLE_EXECUTIVE_TYPOGRAPHY = {
  fontFamily: {
    preview: 'Helvetica, Arial, sans-serif',
    pdf: 'Helvetica',
  },
  fontSize: {
    name: 28,
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
  lineHeight: {
    normal: 1.4,
    summary: 1.6,
  },
  letterSpacing: {
    name: 1.5,
    sectionTitle: 1,
  },
} as const;

export const PURPLE_EXECUTIVE_BORDERS = {
  headerBorder: '3px solid #7c3aed',
  headerBorderPDF: {
    borderBottom: 3,
    borderBottomColor: '#7c3aed',
    paddingBottom: 12,
  },
} as const;

/**
 * Helper function to convert shared styles to inline CSS for Preview templates
 */
export function getPreviewStyles() {
  return {
    container: {
      width: `${PURPLE_EXECUTIVE_SPACING.pageWidth}px`,
      minHeight: `${PURPLE_EXECUTIVE_SPACING.pageMinHeight}px`,
      padding: `${PURPLE_EXECUTIVE_SPACING.pagePadding}px`,
      fontFamily: PURPLE_EXECUTIVE_TYPOGRAPHY.fontFamily.preview,
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body}pt`,
      lineHeight: PURPLE_EXECUTIVE_TYPOGRAPHY.lineHeight.normal,
      backgroundColor: PURPLE_EXECUTIVE_COLORS.white,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      margin: '0 auto',
    },
    header: {
      marginBottom: `${PURPLE_EXECUTIVE_SPACING.headerMarginBottom}px`,
      borderBottom: PURPLE_EXECUTIVE_BORDERS.headerBorder,
      paddingBottom: '12px',
    },
    name: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.name}pt`,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
      letterSpacing: `${PURPLE_EXECUTIVE_TYPOGRAPHY.letterSpacing.name}px`,
    },
    contactInfo: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.contact}pt`,
      color: PURPLE_EXECUTIVE_COLORS.mediumGray,
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${PURPLE_EXECUTIVE_SPACING.smallGap}px`,
    },
    contactItem: {
      marginRight: '15px',
    },
    section: {
      marginBottom: `${PURPLE_EXECUTIVE_SPACING.sectionMarginBottom}px`,
    },
    sectionTitle: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.sectionTitle}pt`,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: `${PURPLE_EXECUTIVE_SPACING.mediumGap}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: `${PURPLE_EXECUTIVE_TYPOGRAPHY.letterSpacing.sectionTitle}px`,
    },
    summary: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body}pt`,
      color: PURPLE_EXECUTIVE_COLORS.dark,
      marginBottom: '10px',
      textAlign: 'justify' as const,
      lineHeight: PURPLE_EXECUTIVE_TYPOGRAPHY.lineHeight.summary,
    },
    experienceItem: {
      marginBottom: `${PURPLE_EXECUTIVE_SPACING.itemMarginBottom}px`,
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      alignItems: 'flex-start',
    },
    jobTitle: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
      color: PURPLE_EXECUTIVE_COLORS.dark,
    },
    company: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body}pt`,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: '3px',
    },
    location: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small}pt`,
      color: PURPLE_EXECUTIVE_COLORS.gray,
    },
    dateRange: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small}pt`,
      color: PURPLE_EXECUTIVE_COLORS.gray,
      textAlign: 'right' as const,
    },
    responsibilities: {
      marginTop: '5px',
    },
    bullet: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small}pt`,
      color: PURPLE_EXECUTIVE_COLORS.lightGray,
      marginLeft: 0,
      marginBottom: '4px',
      display: 'flex',
    },
    bulletPoint: {
      marginRight: '6px',
      color: PURPLE_EXECUTIVE_COLORS.primary,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: '12px',
    },
    degree: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
      color: PURPLE_EXECUTIVE_COLORS.dark,
    },
    institution: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body}pt`,
      color: PURPLE_EXECUTIVE_COLORS.primary,
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${PURPLE_EXECUTIVE_SPACING.mediumGap}px`,
    },
    skillCategory: {
      marginBottom: `${PURPLE_EXECUTIVE_SPACING.mediumGap}px`,
    },
    skillCategoryTitle: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body}pt`,
      fontWeight: PURPLE_EXECUTIVE_TYPOGRAPHY.fontWeight.bold,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: '4px',
    },
    skillsList: {
      fontSize: `${PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small}pt`,
      color: PURPLE_EXECUTIVE_COLORS.lightGray,
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
      padding: PURPLE_EXECUTIVE_SPACING.pagePadding,
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body,
      fontFamily: PURPLE_EXECUTIVE_TYPOGRAPHY.fontFamily.pdf,
      lineHeight: PURPLE_EXECUTIVE_TYPOGRAPHY.lineHeight.normal,
    },
    header: {
      marginBottom: PURPLE_EXECUTIVE_SPACING.headerMarginBottom,
      ...PURPLE_EXECUTIVE_BORDERS.headerBorderPDF,
    },
    name: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.name,
      fontWeight: 'bold' as const,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: 8,
      textTransform: 'uppercase' as const,
      letterSpacing: PURPLE_EXECUTIVE_TYPOGRAPHY.letterSpacing.name,
    },
    contactInfo: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.contact,
      color: PURPLE_EXECUTIVE_COLORS.mediumGray,
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    contactItem: {
      marginRight: 15,
    },
    section: {
      marginBottom: PURPLE_EXECUTIVE_SPACING.sectionMarginBottom,
    },
    sectionTitle: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.sectionTitle,
      fontWeight: 'bold' as const,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: PURPLE_EXECUTIVE_SPACING.mediumGap,
      textTransform: 'uppercase' as const,
      letterSpacing: PURPLE_EXECUTIVE_TYPOGRAPHY.letterSpacing.sectionTitle,
    },
    summary: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body,
      color: PURPLE_EXECUTIVE_COLORS.dark,
      marginBottom: 10,
      textAlign: 'justify' as const,
      lineHeight: PURPLE_EXECUTIVE_TYPOGRAPHY.lineHeight.summary,
    },
    experienceItem: {
      marginBottom: PURPLE_EXECUTIVE_SPACING.itemMarginBottom,
    },
    experienceHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 5,
      alignItems: 'flex-start' as const,
    },
    jobTitle: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: PURPLE_EXECUTIVE_COLORS.dark,
    },
    company: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: 3,
    },
    location: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small,
      color: PURPLE_EXECUTIVE_COLORS.gray,
    },
    dateRange: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small,
      color: PURPLE_EXECUTIVE_COLORS.gray,
      textAlign: 'right' as const,
    },
    responsibilities: {
      marginTop: 5,
    },
    bullet: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small,
      color: PURPLE_EXECUTIVE_COLORS.lightGray,
      marginLeft: 0,
      marginBottom: 4,
      flexDirection: 'row' as const,
    },
    bulletPoint: {
      marginRight: 6,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      fontWeight: 'bold' as const,
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: 12,
    },
    degree: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: PURPLE_EXECUTIVE_COLORS.dark,
    },
    institution: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body,
      color: PURPLE_EXECUTIVE_COLORS.primary,
    },
    skillsContainer: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    skillCategory: {
      marginBottom: PURPLE_EXECUTIVE_SPACING.mediumGap,
    },
    skillCategoryTitle: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.body,
      fontWeight: 'bold' as const,
      color: PURPLE_EXECUTIVE_COLORS.primary,
      marginBottom: 4,
    },
    skillsList: {
      fontSize: PURPLE_EXECUTIVE_TYPOGRAPHY.fontSize.small,
      color: PURPLE_EXECUTIVE_COLORS.lightGray,
    },
  };
}
