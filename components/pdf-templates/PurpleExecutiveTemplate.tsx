import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getPDFStyles } from '@/lib/styles/purple-executive-styles';
import { ResumeData } from '@/lib/types/resume';

// Purple Executive template styles - using shared style definitions
const styles = StyleSheet.create(getPDFStyles());

const educationDetails = {
  fontSize: 10,
  color: '#6b7280',
  fontStyle: 'italic' as const,
};

interface PurpleExecutiveTemplateProps {
  data: ResumeData;
}

const PurpleExecutiveTemplate: React.FC<PurpleExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, publications, volunteer, awards } =
    data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.name || 'YOUR NAME'}</Text>
          <View style={styles.contactInfo}>
            {personalInfo?.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}
            {personalInfo?.phone && <Text style={styles.contactItem}>• {personalInfo.phone}</Text>}
            {personalInfo?.email && <Text style={styles.contactItem}>• {personalInfo.email}</Text>}
            {personalInfo?.website && (
              <Text style={styles.contactItem}>• {personalInfo.website}</Text>
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
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateRange}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </Text>
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
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {edu.graduationDate && (
                    <Text style={educationDetails}>{edu.graduationDate}</Text>
                  )}
                  {edu.gpa && <Text style={educationDetails}>• GPA: {edu.gpa}</Text>}
                </View>
                {edu.location && <Text style={educationDetails}>{edu.location}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(skills).map(([category, skillList], index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                  <Text style={styles.skillsList}>
                    {Array.isArray(skillList) ? skillList.join(' • ') : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937' }}>{cert.name}</Text>
                <Text style={{ fontSize: 10, color: '#7c3aed' }}>
                  {cert.issuer} • {cert.date}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                </Text>
                {cert.credentialId && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>Credential ID: {cert.credentialId}</Text>
                )}
                {cert.credentialUrl && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>{cert.credentialUrl}</Text>
                )}
                {cert.description && (
                  <Text style={{ fontSize: 10, color: '#374151', marginTop: 2 }}>{cert.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {languages.map((lang, index) => (
                <View key={index} style={{ marginBottom: 8, marginRight: 20, width: '45%' }}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937' }}>
                    {lang.language}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#7c3aed' }}>{lang.proficiency}</Text>
                  {lang.certifications && lang.certifications.length > 0 && (
                    <Text style={{ fontSize: 9, color: '#6b7280' }}>
                      {lang.certifications.join(', ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{project.name}</Text>
                    {project.role && (
                      <Text style={{ fontSize: 10, color: '#7c3aed', fontStyle: 'italic' }}>
                        {project.role}
                      </Text>
                    )}
                  </View>
                  <View>
                    {project.startDate && (
                      <Text style={styles.dateRange}>
                        {project.startDate} - {project.endDate || (project.current ? 'Present' : '')}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>
                  {project.description}
                </Text>
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 4 }}>
                    <Text style={{ fontWeight: 'bold' }}>Technologies:</Text> {project.technologies.join(', ')}
                  </Text>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <View style={styles.responsibilities}>
                    {project.highlights.map((highlight, idx) => (
                      <View key={idx} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {(project.url || project.github) && (
                  <Text style={{ fontSize: 9, color: '#6b7280', marginTop: 3 }}>
                    {project.url && `URL: ${project.url}`}
                    {project.url && project.github && ' • '}
                    {project.github && `GitHub: ${project.github}`}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Publications */}
        {publications && publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {publications.map((pub, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937' }}>{pub.title}</Text>
                <Text style={{ fontSize: 10, color: '#7c3aed' }}>
                  {pub.publisher} • {pub.date}
                </Text>
                {pub.authors && pub.authors.length > 0 && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>Authors: {pub.authors.join(', ')}</Text>
                )}
                {pub.description && (
                  <Text style={{ fontSize: 10, color: '#374151', marginTop: 2 }}>{pub.description}</Text>
                )}
                {(pub.url || pub.doi) && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>
                    {pub.doi && `DOI: ${pub.doi}`}
                    {pub.doi && pub.url && ' • '}
                    {pub.url && `URL: ${pub.url}`}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Volunteer Work */}
        {volunteer && volunteer.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Work</Text>
            {volunteer.map((vol, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{vol.role}</Text>
                    <Text style={styles.company}>{vol.organization}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateRange}>
                      {vol.startDate} - {vol.endDate || (vol.current ? 'Present' : '')}
                    </Text>
                  </View>
                </View>
                {vol.location && (
                  <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>{vol.location}</Text>
                )}
                {vol.description && (
                  <Text style={{ fontSize: 10, color: '#374151', marginTop: 2, marginBottom: 4 }}>
                    {vol.description}
                  </Text>
                )}
                {vol.highlights && vol.highlights.length > 0 && (
                  <View style={styles.responsibilities}>
                    {vol.highlights.map((highlight, idx) => (
                      <View key={idx} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Honors</Text>
            {awards.map((award, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937' }}>{award.title}</Text>
                <Text style={{ fontSize: 10, color: '#7c3aed' }}>
                  {award.issuer} • {award.date}
                </Text>
                {award.description && (
                  <Text style={{ fontSize: 10, color: '#374151', marginTop: 2 }}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PurpleExecutiveTemplate;
