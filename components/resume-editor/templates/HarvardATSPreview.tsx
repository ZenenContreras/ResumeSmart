import React from 'react';
import { ResumeData } from '@/lib/types/resume';
import { getPreviewStyles } from '@/lib/styles/harvard-ats-styles';

interface HarvardATSPreviewProps {
  data: ResumeData;
}

export function HarvardATSPreview({ data }: HarvardATSPreviewProps) {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, publications, volunteer, awards } = data;
  const styles = getPreviewStyles();

  return (
    <div data-resume-preview style={styles.container}>
      {/* Header - Name and Contact */}
      {personalInfo && (
        <div style={styles.header}>
          <h1 style={styles.name}>
            {personalInfo.name || 'YOUR NAME'}
          </h1>
          <div style={styles.contactInfo}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && (
              <>
                <span>•</span>
                <span>{personalInfo.phone}</span>
              </>
            )}
            {personalInfo.location && (
              <>
                <span>•</span>
                <span>{personalInfo.location}</span>
              </>
            )}
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                <span>{personalInfo.linkedin}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <p style={{ fontSize: '10pt', lineHeight: '1.5' }}>{summary}</p>
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
                </div>
                <div style={styles.dateRange}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={styles.company}>{exp.company}</p>
                {exp.location && (
                  <p style={{ fontSize: '10pt', fontStyle: 'italic' }}>{exp.location}</p>
                )}
              </div>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div style={{ marginTop: '4px' }}>
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} style={styles.bullet}>
                      •&nbsp;&nbsp;{resp}
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
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={styles.jobTitle}>{edu.degree}</h3>
                {edu.graduationDate && <span style={{ fontSize: '10pt' }}>{edu.graduationDate}</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={styles.company}>{edu.institution}</p>
                {edu.location && (
                  <p style={{ fontSize: '10pt', fontStyle: 'italic' }}>{edu.location}</p>
                )}
              </div>
              {edu.gpa && <p style={{ fontSize: '10pt' }}>GPA: {edu.gpa}</p>}
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
              <div key={index} style={styles.skillCategory}>
                <span style={styles.skillCategoryTitle}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                </span>
                {' '}
                <span style={styles.skillsList}>
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
            <div key={index} style={{ marginBottom: '6px' }}>
              <p style={{ fontSize: '10pt', fontWeight: 'bold' }}>{cert.name}</p>
              <p style={{ fontSize: '10pt' }}>
                {cert.issuer} • {cert.date}
                {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
              </p>
              {cert.credentialId && (
                <p style={{ fontSize: '9pt' }}>Credential ID: {cert.credentialId}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {languages.map((lang, index) => (
              <div key={index} style={{ fontSize: '10pt' }}>
                <strong>{lang.language}:</strong> {lang.proficiency}
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
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={styles.jobTitle}>{project.name}</h3>
                {project.startDate && (
                  <span style={{ fontSize: '10pt' }}>
                    {project.startDate} - {project.endDate || (project.current ? 'Present' : '')}
                  </span>
                )}
              </div>
              {project.description && (
                <p style={{ fontSize: '10pt', marginTop: '2px' }}>{project.description}</p>
              )}
              {project.technologies && (
                <p style={{ fontSize: '9pt', marginTop: '2px', fontStyle: 'italic' }}>
                  Technologies: {project.technologies.join(', ')}
                </p>
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
            <div key={index} style={{ marginBottom: '6px' }}>
              <p style={{ fontSize: '10pt', fontWeight: 'bold' }}>{pub.title}</p>
              <p style={{ fontSize: '10pt' }}>
                {pub.publisher} • {pub.date}
              </p>
              {pub.url && (
                <p style={{ fontSize: '9pt', fontStyle: 'italic' }}>{pub.url}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer Experience */}
      {volunteer && volunteer.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Volunteer Experience</h2>
          {volunteer.map((vol, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={styles.jobTitle}>{vol.role}</h3>
                <span style={{ fontSize: '10pt' }}>
                  {vol.startDate} - {vol.endDate || 'Present'}
                </span>
              </div>
              <p style={styles.company}>{vol.organization}</p>
              {vol.description && (
                <p style={{ fontSize: '10pt', marginTop: '2px' }}>{vol.description}</p>
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
            <div key={index} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '10pt', fontWeight: 'bold' }}>{award.title}</p>
                {award.date && <span style={{ fontSize: '10pt' }}>{award.date}</span>}
              </div>
              {award.issuer && <p style={{ fontSize: '10pt' }}>{award.issuer}</p>}
              {award.description && (
                <p style={{ fontSize: '9pt', marginTop: '2px' }}>{award.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
