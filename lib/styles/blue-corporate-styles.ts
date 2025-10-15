/**
 * Blue Corporate Template - Shared Style Definitions
 * Two-column layout with dark blue sidebar
 * These values are used by both Preview (HTML) and PDF templates
 * to ensure consistency between what users see and what they download
 */

export const BLUE_CORPORATE_COLORS = {
  darkBlue: '#1e3a8a',
  lightBlue: '#60a5fa',
  dark: '#1f2937',
  white: '#ffffff',
  lightGray: '#e5e7eb',
  mediumGray: '#6b7280',
} as const;

export const BLUE_CORPORATE_SPACING = {
  pageWidth: 794, // A4 width: 210mm = 8.27 inches at 96 DPI
  pageMinHeight: 1123, // A4 height: 297mm = 11.69 inches at 96 DPI
  sidebarWidth: '35%',
  mainWidth: '65%',
  sidebarPadding: 25,
  mainPadding: 30,
  sectionMarginBottom: 18,
  sidebarSectionMarginBottom: 20,
  itemMarginBottom: 12,
  smallGap: 4,
  mediumGap: 10,
  largeGap: 15,
} as const;

export const BLUE_CORPORATE_TYPOGRAPHY = {
  fontFamily: {
    preview: 'Helvetica, Arial, sans-serif',
    pdf: 'Helvetica',
  },
  fontSize: {
    sidebarName: 22,
    mainSectionTitle: 14,
    sidebarSectionTitle: 12,
    jobTitle: 12,
    body: 10,
    contact: 9,
    small: 9,
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
    name: 1,
    mainSectionTitle: 0.5,
    sidebarSectionTitle: 0.5,
  },
} as const;

export const BLUE_CORPORATE_BORDERS = {
  sidebarSectionBorder: '2px solid #60a5fa',
  mainSectionBorder: '2px solid #1e3a8a',
  sidebarSectionBorderPDF: {
    borderBottom: 2,
    borderBottomColor: '#60a5fa',
    paddingBottom: 5,
  },
  mainSectionBorderPDF: {
    borderBottom: 2,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 5,
  },
} as const;

/**
 * Helper function to convert shared styles to inline CSS for Preview templates
 */
export function getPreviewStyles() {
  return {
    container: {
      width: `${BLUE_CORPORATE_SPACING.pageWidth}px`,
      minHeight: `${BLUE_CORPORATE_SPACING.pageMinHeight}px`,
      display: 'flex',
      fontFamily: BLUE_CORPORATE_TYPOGRAPHY.fontFamily.preview,
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.body}pt`,
      lineHeight: BLUE_CORPORATE_TYPOGRAPHY.lineHeight.normal,
      backgroundColor: BLUE_CORPORATE_COLORS.white,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      margin: '0 auto',
    },
    sidebar: {
      width: BLUE_CORPORATE_SPACING.sidebarWidth,
      backgroundColor: BLUE_CORPORATE_COLORS.darkBlue,
      padding: `${BLUE_CORPORATE_SPACING.sidebarPadding}px`,
      color: BLUE_CORPORATE_COLORS.white,
    },
    mainContent: {
      width: BLUE_CORPORATE_SPACING.mainWidth,
      padding: `${BLUE_CORPORATE_SPACING.mainPadding}px`,
    },
    sidebarName: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.sidebarName}pt`,
      fontWeight: BLUE_CORPORATE_TYPOGRAPHY.fontWeight.bold,
      marginBottom: '20px',
      textTransform: 'uppercase' as const,
      letterSpacing: `${BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.name}px`,
    },
    sidebarSection: {
      marginBottom: `${BLUE_CORPORATE_SPACING.sidebarSectionMarginBottom}px`,
    },
    sidebarSectionTitle: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.sidebarSectionTitle}pt`,
      fontWeight: BLUE_CORPORATE_TYPOGRAPHY.fontWeight.bold,
      marginBottom: `${BLUE_CORPORATE_SPACING.mediumGap}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: `${BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.sidebarSectionTitle}px`,
      borderBottom: BLUE_CORPORATE_BORDERS.sidebarSectionBorder,
      paddingBottom: '6px',
    },
    contactItem: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.contact}pt`,
      marginBottom: '5px',
      color: BLUE_CORPORATE_COLORS.lightGray,
    },
    skillItem: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.small}pt`,
      marginBottom: '4px',
      color: BLUE_CORPORATE_COLORS.lightGray,
    },
    mainSection: {
      marginBottom: `${BLUE_CORPORATE_SPACING.sectionMarginBottom}px`,
    },
    mainSectionTitle: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.mainSectionTitle}pt`,
      fontWeight: BLUE_CORPORATE_TYPOGRAPHY.fontWeight.bold,
      color: BLUE_CORPORATE_COLORS.darkBlue,
      marginBottom: `${BLUE_CORPORATE_SPACING.mediumGap}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: `${BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.mainSectionTitle}px`,
      borderBottom: BLUE_CORPORATE_BORDERS.mainSectionBorder,
      paddingBottom: '5px',
    },
    summary: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.body}pt`,
      color: BLUE_CORPORATE_COLORS.dark,
      textAlign: 'justify' as const,
      lineHeight: BLUE_CORPORATE_TYPOGRAPHY.lineHeight.summary,
    },
    experienceItem: {
      marginBottom: `${BLUE_CORPORATE_SPACING.itemMarginBottom}px`,
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
    },
    jobTitle: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: BLUE_CORPORATE_TYPOGRAPHY.fontWeight.bold,
      color: BLUE_CORPORATE_COLORS.dark,
    },
    company: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.body}pt`,
      color: BLUE_CORPORATE_COLORS.darkBlue,
      marginBottom: '3px',
    },
    location: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.small}pt`,
      color: BLUE_CORPORATE_COLORS.mediumGray,
    },
    dateRange: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.small}pt`,
      color: BLUE_CORPORATE_COLORS.mediumGray,
    },
    responsibilities: {
      marginTop: '4px',
    },
    bullet: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.small}pt`,
      color: BLUE_CORPORATE_COLORS.dark,
      marginLeft: '15px',
      marginBottom: '3px',
      display: 'flex',
    },
    bulletPoint: {
      marginRight: '5px',
      color: BLUE_CORPORATE_COLORS.darkBlue,
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: `${BLUE_CORPORATE_SPACING.itemMarginBottom}px`,
    },
    degree: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.jobTitle}pt`,
      fontWeight: BLUE_CORPORATE_TYPOGRAPHY.fontWeight.bold,
      color: BLUE_CORPORATE_COLORS.dark,
    },
    institution: {
      fontSize: `${BLUE_CORPORATE_TYPOGRAPHY.fontSize.body}pt`,
      color: BLUE_CORPORATE_COLORS.darkBlue,
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
      padding: 0,
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.body,
      fontFamily: BLUE_CORPORATE_TYPOGRAPHY.fontFamily.pdf,
      lineHeight: BLUE_CORPORATE_TYPOGRAPHY.lineHeight.normal,
    },
    container: {
      flexDirection: 'row' as const,
      height: '100%',
    },
    sidebar: {
      width: BLUE_CORPORATE_SPACING.sidebarWidth,
      backgroundColor: BLUE_CORPORATE_COLORS.darkBlue,
      padding: BLUE_CORPORATE_SPACING.sidebarPadding,
      color: BLUE_CORPORATE_COLORS.white,
    },
    mainContent: {
      width: BLUE_CORPORATE_SPACING.mainWidth,
      padding: BLUE_CORPORATE_SPACING.mainPadding,
    },
    sidebarName: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.sidebarName,
      fontWeight: 'bold' as const,
      marginBottom: 20,
      textTransform: 'uppercase' as const,
      letterSpacing: BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.name,
    },
    sidebarSection: {
      marginBottom: BLUE_CORPORATE_SPACING.sidebarSectionMarginBottom,
    },
    sidebarSectionTitle: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.sidebarSectionTitle,
      fontWeight: 'bold' as const,
      marginBottom: BLUE_CORPORATE_SPACING.mediumGap,
      textTransform: 'uppercase' as const,
      letterSpacing: BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.sidebarSectionTitle,
      ...BLUE_CORPORATE_BORDERS.sidebarSectionBorderPDF,
    },
    contactItem: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.contact,
      marginBottom: 5,
      color: BLUE_CORPORATE_COLORS.lightGray,
    },
    skillItem: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.small,
      marginBottom: 4,
      color: BLUE_CORPORATE_COLORS.lightGray,
    },
    mainSection: {
      marginBottom: BLUE_CORPORATE_SPACING.sectionMarginBottom,
    },
    mainSectionTitle: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.mainSectionTitle,
      fontWeight: 'bold' as const,
      color: BLUE_CORPORATE_COLORS.darkBlue,
      marginBottom: BLUE_CORPORATE_SPACING.mediumGap,
      textTransform: 'uppercase' as const,
      letterSpacing: BLUE_CORPORATE_TYPOGRAPHY.letterSpacing.mainSectionTitle,
      ...BLUE_CORPORATE_BORDERS.mainSectionBorderPDF,
    },
    summary: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.body,
      color: BLUE_CORPORATE_COLORS.dark,
      textAlign: 'justify' as const,
      lineHeight: BLUE_CORPORATE_TYPOGRAPHY.lineHeight.summary,
    },
    experienceItem: {
      marginBottom: BLUE_CORPORATE_SPACING.itemMarginBottom,
    },
    experienceHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: BLUE_CORPORATE_COLORS.dark,
    },
    company: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.body,
      color: BLUE_CORPORATE_COLORS.darkBlue,
      marginBottom: 3,
    },
    location: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.small,
      color: BLUE_CORPORATE_COLORS.mediumGray,
    },
    dateRange: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.small,
      color: BLUE_CORPORATE_COLORS.mediumGray,
    },
    responsibilities: {
      marginTop: 4,
    },
    bullet: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.small,
      color: BLUE_CORPORATE_COLORS.dark,
      marginLeft: 15,
      marginBottom: 3,
      flexDirection: 'row' as const,
    },
    bulletPoint: {
      marginRight: 5,
      color: BLUE_CORPORATE_COLORS.darkBlue,
    },
    bulletText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: BLUE_CORPORATE_SPACING.itemMarginBottom,
    },
    degree: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.jobTitle,
      fontWeight: 'bold' as const,
      color: BLUE_CORPORATE_COLORS.dark,
    },
    institution: {
      fontSize: BLUE_CORPORATE_TYPOGRAPHY.fontSize.body,
      color: BLUE_CORPORATE_COLORS.darkBlue,
    },
  };
}
