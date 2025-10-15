import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { getPDFStyles } from '@/lib/styles/modern-styles';
import { ResumeData } from '@/lib/types/resume';

// Modern template styles - using shared style definitions
const styles = StyleSheet.create(getPDFStyles());

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.name || 'Your Name'}</Text>
          <View style={styles.contactInfo}>
            {personalInfo?.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo?.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}
            {personalInfo?.linkedin && (
              <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>
            )}
            {personalInfo?.website && (
              <Text style={styles.contactItem}>{personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    {exp.location && (
                      <Text style={styles.location}>{exp.location}</Text>
                    )}
                  </View>
                  <View>
                    {(exp.startDate || exp.endDate) && (
                      <Text style={styles.dateRange}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </Text>
                    )}
                  </View>
                </View>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <View style={styles.responsibilities}>
                    {exp.responsibilities.map((resp, idx) => (
                      <View key={idx} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{resp}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {edu.location && (
                    <Text style={styles.location}>{edu.location}</Text>
                  )}
                  {edu.graduationDate && (
                    <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                  )}
                </View>
                {edu.gpa && (
                  <Text style={styles.location}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {Object.entries(skills).map(([category, skillList], index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                </Text>
                <Text style={styles.skillsList}>
                  {Array.isArray(skillList) ? skillList.join(', ') : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.jobTitle}>{cert.name}</Text>
                <Text style={styles.location}>
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ModernTemplate;
