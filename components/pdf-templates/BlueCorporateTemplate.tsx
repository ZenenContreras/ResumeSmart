import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getPDFStyles } from '@/lib/styles/blue-corporate-styles';
import { ResumeData } from '@/lib/types/resume';

// Blue Corporate template styles - using shared style definitions
const styles = StyleSheet.create(getPDFStyles());

const educationDetails = {
  fontSize: 9,
  color: '#6b7280',
};

interface BlueCorporateTemplateProps {
  data: ResumeData;
}

const BlueCorporateTemplate: React.FC<BlueCorporateTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, publications, volunteer, awards } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.sidebarName}>{personalInfo?.name || 'YOUR NAME'}</Text>

            {/* Contact Information */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Contact</Text>
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
            </View>

            {/* Key Skills */}
            {skills && Object.keys(skills).length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                {Object.entries(skills).map(([category, skillList], index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    {Array.isArray(skillList) &&
                      skillList.map((skill, idx) => (
                        <Text key={idx} style={styles.skillItem}>
                          • {skill}
                        </Text>
                      ))}
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {languages.map((lang, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#ffffff' }}>
                      {lang.language}
                    </Text>
                    <Text style={{ fontSize: 8, color: '#e5e7eb' }}>{lang.proficiency}</Text>
                    {lang.certifications && lang.certifications.length > 0 && (
                      <Text style={{ fontSize: 7, color: '#e5e7eb' }}>
                        {lang.certifications.join(', ')}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Certifications</Text>
                {certifications.map((cert, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#ffffff' }}>
                      {cert.name}
                    </Text>
                    <Text style={{ fontSize: 8, color: '#e5e7eb' }}>
                      {cert.issuer} • {cert.date}
                    </Text>
                    {cert.credentialId && (
                      <Text style={{ fontSize: 7, color: '#e5e7eb' }}>ID: {cert.credentialId}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Awards */}
            {awards && awards.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Awards</Text>
                {awards.map((award, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#ffffff' }}>
                      {award.title}
                    </Text>
                    <Text style={{ fontSize: 7, color: '#e5e7eb' }}>
                      {award.issuer} • {award.date}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {/* Summary */}
            {summary && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Professional Summary</Text>
                <Text style={styles.summary}>{summary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Experience</Text>
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
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {edu.location && (
                        <Text style={educationDetails}>{edu.location}</Text>
                      )}
                      {edu.graduationDate && (
                        <Text style={educationDetails}>• {edu.graduationDate}</Text>
                      )}
                      {edu.gpa && <Text style={educationDetails}>• GPA: {edu.gpa}</Text>}
                    </View>
                    {edu.honors && (
                      <Text style={educationDetails}>{edu.honors}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.jobTitle}>{project.name}</Text>
                        {project.role && (
                          <Text style={{ fontSize: 9, color: '#1e3a8a', fontStyle: 'italic' }}>
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
                    <Text style={{ fontSize: 9, color: '#374151', marginBottom: 3 }}>
                      {project.description}
                    </Text>
                    {project.technologies && project.technologies.length > 0 && (
                      <Text style={{ fontSize: 8, color: '#6b7280', marginBottom: 3 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tech:</Text> {project.technologies.join(', ')}
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
                  </View>
                ))}
              </View>
            )}

            {/* Publications */}
            {publications && publications.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Publications</Text>
                {publications.map((pub, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e3a8a' }}>
                      {pub.title}
                    </Text>
                    <Text style={{ fontSize: 9, color: '#1f2937' }}>
                      {pub.publisher} • {pub.date}
                    </Text>
                    {pub.authors && pub.authors.length > 0 && (
                      <Text style={{ fontSize: 8, color: '#6b7280' }}>
                        Authors: {pub.authors.join(', ')}
                      </Text>
                    )}
                    {pub.description && (
                      <Text style={{ fontSize: 9, color: '#374151', marginTop: 2 }}>
                        {pub.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Work */}
            {volunteer && volunteer.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Volunteer Work</Text>
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
                    {vol.description && (
                      <Text style={{ fontSize: 9, color: '#374151', marginTop: 2, marginBottom: 3 }}>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BlueCorporateTemplate;
