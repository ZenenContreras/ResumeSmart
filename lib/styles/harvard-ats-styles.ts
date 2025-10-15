/**
 * Harvard ATS Template - Shared Style Definitions
 * These values are used by both Preview (HTML) and PDF templates
 * to ensure consistency between what users see and what they download
 */

export const HARVARD_ATS_COLORS = {
  black: '#000000',
  white: '#ffffff',
  border: '#000000',
} as const;

export const HARVARD_ATS_SPACING = {
  pageWidth: 794, // A4 width: 210mm = 8.27 inches at 96 DPI
  pageMinHeight: 1123, // A4 height: 297mm = 11.69 inches at 96 DPI
  pagePadding: 50,
  sectionMarginBottom: 16,
  headerMarginBottom: 16,
  itemMarginBottom: 12,
  smallGap: 4,
  mediumGap: 8,
  largeGap: 12,
} as const;

export const HARVARD_ATS_TYPOGRAPHY = {
  fontFamily: {
    preview: 'Arial, Helvetica, sans-serif',
    pdf: 'Helvetica',
  },
  fontSize: {
    name: 20,
    sectionTitle: 12,
    jobTitle: 11,
    body: 11,
    contact: 10,
    small: 10,
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
  lineHeight: 1.4,
  letterSpacing: {
    name: 1,
    sectionTitle: 0.5,
  },
} as const;

export const HARVARD_ATS_BORDERS = {
  sectionTitleBorder: '1px solid #000',
  sectionTitleBorderPDF: {
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
  },
} as const;

/**
 * Helper function to convert shared styles to inline CSS for Preview templates
 */
export function getPreviewStyles() {
  return {
    container: {
      width: `${HARVARD_ATS_SPACING.pageWidth}px`,
      minHeight: `${HARVARD_ATS_SPACING.pageMinHeight}px`,
      padding: `${HARVARD_ATS_SPACING.pagePadding}px`,
      fontFamily: HARVARD_ATS_TYPOGRAPHY.fontFamily.preview,
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.body}pt`,
      lineHeight: HARVARD_ATS_TYPOGRAPHY.lineHeight,
      backgroundColor: HARVARD_ATS_COLORS.white,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      margin: '0 auto',
    },
    header: {
      marginBottom: `${HARVARD_ATS_SPACING.headerMarginBottom}px`,
      textAlign: 'center' as const,
    },
    name: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.name}pt`,
      fontWeight: HARVARD_ATS_TYPOGRAPHY.fontWeight.bold,
      marginBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: `${HARVARD_ATS_TYPOGRAPHY.letterSpacing.name}px`,
    },
    contactInfo: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
      gap: `${HARVARD_ATS_SPACING.mediumGap}px`,
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.contact}pt`,
    },
    section: {
      marginBottom: `${HARVARD_ATS_SPACING.sectionMarginBottom}px`,
    },
    sectionTitle: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.sectionTitle}pt`,
      fontWeight: HARVARD_ATS_TYPOGRAPHY.fontWeight.bold,
      marginBottom: `${HARVARD_ATS_SPACING.mediumGap}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: `${HARVARD_ATS_TYPOGRAPHY.letterSpacing.sectionTitle}px`,
      borderBottom: HARVARD_ATS_BORDERS.sectionTitleBorder,
      paddingBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
    },
    experienceItem: {
      marginBottom: `${HARVARD_ATS_SPACING.itemMarginBottom}px`,
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
    },
    jobTitle: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: HARVARD_ATS_TYPOGRAPHY.fontWeight.bold,
    },
    company: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontStyle: 'italic' as const,
      marginBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
    },
    dateRange: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.small}pt`,
      textAlign: 'right' as const,
    },
    bullet: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.small}pt`,
      marginBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
      paddingLeft: '15px',
      textIndent: '-15px',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${HARVARD_ATS_SPACING.mediumGap}px`,
    },
    skillCategory: {
      marginBottom: `${HARVARD_ATS_SPACING.mediumGap}px`,
    },
    skillCategoryTitle: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.body}pt`,
      fontWeight: HARVARD_ATS_TYPOGRAPHY.fontWeight.bold,
      marginBottom: `${HARVARD_ATS_SPACING.smallGap}px`,
    },
    skillsList: {
      fontSize: `${HARVARD_ATS_TYPOGRAPHY.fontSize.small}pt`,
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
      padding: HARVARD_ATS_SPACING.pagePadding,
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.body,
      fontFamily: HARVARD_ATS_TYPOGRAPHY.fontFamily.pdf,
      lineHeight: HARVARD_ATS_TYPOGRAPHY.lineHeight,
      color: HARVARD_ATS_COLORS.black,
    },
    header: {
      marginBottom: HARVARD_ATS_SPACING.headerMarginBottom,
      textAlign: 'center' as const,
    },
    name: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.name,
      fontWeight: 'bold' as const,
      marginBottom: HARVARD_ATS_SPACING.smallGap,
      textTransform: 'uppercase' as const,
      letterSpacing: HARVARD_ATS_TYPOGRAPHY.letterSpacing.name,
    },
    contactInfo: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.contact,
      flexDirection: 'row' as const,
      justifyContent: 'center' as const,
      flexWrap: 'wrap' as const,
    },
    contactItem: {
      marginHorizontal: 5,
    },
    section: {
      marginBottom: HARVARD_ATS_SPACING.sectionMarginBottom,
    },
    sectionTitle: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.sectionTitle,
      fontWeight: 'bold' as const,
      textTransform: 'uppercase' as const,
      letterSpacing: HARVARD_ATS_TYPOGRAPHY.letterSpacing.sectionTitle,
      borderBottom: 1,
      borderBottomColor: '#000000',
      paddingBottom: 4,
      marginBottom: HARVARD_ATS_SPACING.mediumGap,
    },
    summary: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
      marginBottom: HARVARD_ATS_SPACING.mediumGap,
      lineHeight: 1.5,
    },
    experienceItem: {
      marginBottom: HARVARD_ATS_SPACING.itemMarginBottom,
    },
    experienceHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: HARVARD_ATS_SPACING.smallGap,
    },
    jobTitle: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
    },
    company: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle,
      fontStyle: 'italic' as const,
      marginBottom: HARVARD_ATS_SPACING.smallGap,
    },
    dateRange: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
      textAlign: 'right' as const,
    },
    location: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
      fontStyle: 'italic' as const,
    },
    responsibilities: {
      marginTop: HARVARD_ATS_SPACING.smallGap,
    },
    bullet: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
      marginBottom: HARVARD_ATS_SPACING.smallGap,
      paddingLeft: 15,
      flexDirection: 'row' as const,
    },
    bulletPoint: {
      marginRight: 5,
      minWidth: 10,
    },
    bulletText: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
      flex: 1,
    },
    educationItem: {
      marginBottom: HARVARD_ATS_SPACING.mediumGap,
    },
    degree: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
    },
    institution: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.jobTitle,
      fontStyle: 'italic' as const,
    },
    skillsGrid: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    skillCategory: {
      marginBottom: HARVARD_ATS_SPACING.mediumGap,
    },
    skillCategoryTitle: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.body,
      fontWeight: 'bold' as const,
      marginBottom: HARVARD_ATS_SPACING.smallGap,
    },
    skillsList: {
      fontSize: HARVARD_ATS_TYPOGRAPHY.fontSize.small,
    },
    skillsContainer: {
      flexDirection: 'column' as const,
    },
  };
}
