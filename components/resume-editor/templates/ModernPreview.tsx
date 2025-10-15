import React from 'react';
import { ResumeData } from '@/lib/types/resume';
import { getPreviewStyles } from '@/lib/styles/modern-styles';

interface ModernPreviewProps {
  data: ResumeData;
}

export function ModernPreview({ data }: ModernPreviewProps) {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, publications, volunteer, awards } = data;
  const styles = getPreviewStyles();

  return (
    <div data-resume-preview style={styles.container}>
      {/* Header */}
      {personalInfo && (
        <div style={styles.header}>
          <h1 style={styles.name}>
            {personalInfo.name || 'YOUR NAME'}
          </h1>
          <div style={styles.contactInfo}>
            {personalInfo.email && <span style={styles.contactItem}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={styles.contactItem}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={styles.contactItem}>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span style={styles.contactItem}>{personalInfo.linkedin}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.summary}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.experienceHeader}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.jobTitle}>{exp.title}</h3>
                  <p style={styles.company}>{exp.company}</p>
                  {exp.location && <p style={styles.location}>{exp.location}</p>}
                </div>
                <div>
                  <span style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
              </div>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div style={styles.responsibilities}>
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} style={styles.bullet}>
                      <span style={styles.bulletPoint}>•</span>
                      <span style={styles.bulletText}>{resp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={styles.educationItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={styles.degree}>{edu.degree}</h3>
                {edu.graduationDate && <span style={styles.dateRange}>{edu.graduationDate}</span>}
              </div>
              <p style={styles.institution}>{edu.institution}</p>
              {edu.location && <p style={styles.location}>{edu.location}</p>}
              {edu.gpa && <p style={styles.summary}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && Object.keys(skills).length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div>
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '10pt' }}>
                <span style={{ fontWeight: 'bold', minWidth: '100px', color: '#2563eb', textTransform: 'capitalize' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                </span>
                <span style={{ flex: 1, color: '#374151' }}>
                  {Array.isArray(skillList) ? skillList.join(', ') : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} style={styles.educationItem}>
              <p style={styles.jobTitle}>{cert.name}</p>
              <p style={styles.location}>
                {cert.issuer} • {cert.date}
                {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
              </p>
              {cert.credentialId && (
                <p style={{ fontSize: '9pt', color: '#6b7280' }}>
                  Credential ID: {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((lang, index) => (
              <div key={index} style={{ fontSize: '10pt', color: '#374151' }}>
                <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{lang.language}</span> - {lang.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.experienceHeader}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.jobTitle}>{project.name}</h3>
                  {project.role && <p style={{ fontSize: '10pt', fontStyle: 'italic', color: '#6b7280' }}>{project.role}</p>}
                </div>
                {project.startDate && (
                  <span style={styles.dateRange}>
                    {project.startDate} - {project.endDate || (project.current ? 'Present' : '')}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '10pt', color: '#374151', marginBottom: '4px' }}>{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p style={{ fontSize: '9pt', color: '#6b7280', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Technologies:</span> {project.technologies.join(', ')}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <div style={styles.responsibilities}>
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} style={styles.bullet}>
                      <span style={styles.bulletPoint}>•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Publications</h2>
          {publications.map((pub, index) => (
            <div key={index} style={styles.educationItem}>
              <p style={styles.jobTitle}>{pub.title}</p>
              <p style={styles.location}>{pub.publisher} • {pub.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {volunteer && volunteer.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Volunteer Work</h2>
          {volunteer.map((vol, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.experienceHeader}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.jobTitle}>{vol.role}</h3>
                  <p style={styles.company}>{vol.organization}</p>
                  {vol.location && <p style={styles.location}>{vol.location}</p>}
                </div>
                <span style={styles.dateRange}>
                  {vol.startDate} - {vol.endDate || (vol.current ? 'Present' : '')}
                </span>
              </div>
              {vol.description && (
                <p style={{ fontSize: '10pt', color: '#374151', marginTop: '4px' }}>{vol.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Awards & Honors</h2>
          {awards.map((award, index) => (
            <div key={index} style={styles.educationItem}>
              <p style={styles.jobTitle}>{award.title}</p>
              <p style={styles.location}>{award.issuer} • {award.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
