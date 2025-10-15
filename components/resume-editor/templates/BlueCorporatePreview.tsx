import React from 'react';
import { ResumeData } from '@/lib/types/resume';

interface BlueCorporatePreviewProps {
  data: ResumeData;
}

export function BlueCorporatePreview({ data }: BlueCorporatePreviewProps) {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, publications, volunteer, awards } = data;

  return (
    <div
      data-resume-preview
      style={{
        width: '816px',
        minHeight: '1056px',
        display: 'flex',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '10pt',
        lineHeight: '1.4',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        margin: '0 auto'
      }}
    >
      {/* Left Sidebar */}
      <div style={{
        width: '35%',
        backgroundColor: '#1e3a8a',
        padding: '25px',
        color: '#ffffff'
      }}>
        {/* Sidebar Name */}
        {personalInfo && (
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{
              fontSize: '22pt',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {personalInfo.name || 'YOUR NAME'}
            </h1>
          </div>
        )}

        {/* Contact Info */}
        {personalInfo && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #60a5fa',
              paddingBottom: '6px'
            }}>
              Contact
            </h2>
            {personalInfo.email && (
              <p style={{ fontSize: '9pt', marginBottom: '5px', color: '#e5e7eb' }}>
                {personalInfo.email}
              </p>
            )}
            {personalInfo.phone && (
              <p style={{ fontSize: '9pt', marginBottom: '5px', color: '#e5e7eb' }}>
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.location && (
              <p style={{ fontSize: '9pt', marginBottom: '5px', color: '#e5e7eb' }}>
                {personalInfo.location}
              </p>
            )}
            {personalInfo.linkedin && (
              <p style={{ fontSize: '9pt', marginBottom: '5px', color: '#e5e7eb' }}>
                {personalInfo.linkedin}
              </p>
            )}
          </div>
        )}

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #60a5fa',
              paddingBottom: '6px'
            }}>
              Skills
            </h2>
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <p style={{
                  fontSize: '9pt',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#60a5fa'
                }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
                {Array.isArray(skillList) && skillList.map((skill, idx) => (
                  <p key={idx} style={{
                    fontSize: '9pt',
                    marginBottom: '2px',
                    color: '#e5e7eb'
                  }}>
                    • {skill}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #60a5fa',
              paddingBottom: '6px'
            }}>
              Languages
            </h2>
            {languages.map((lang, index) => (
              <p key={index} style={{
                fontSize: '9pt',
                marginBottom: '4px',
                color: '#e5e7eb'
              }}>
                <span style={{ fontWeight: 'bold' }}>{lang.language}</span> - {lang.proficiency}
              </p>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #60a5fa',
              paddingBottom: '6px'
            }}>
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <p style={{
                  fontSize: '9pt',
                  fontWeight: 'bold',
                  color: '#e5e7eb',
                  marginBottom: '2px'
                }}>
                  {cert.name}
                </p>
                <p style={{ fontSize: '8pt', color: '#d1d5db' }}>
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        width: '65%',
        padding: '30px'
      }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Professional Summary
            </h2>
            <p style={{
              fontSize: '10pt',
              color: '#1f2937',
              textAlign: 'justify',
              lineHeight: '1.6'
            }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#1e3a8a'
                    }}>
                      {exp.title}
                    </h3>
                    <p style={{
                      fontSize: '10pt',
                      color: '#1f2937',
                      marginBottom: '2px'
                    }}>
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p style={{
                        fontSize: '9pt',
                        color: '#6b7280'
                      }}>
                        {exp.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '9pt',
                      color: '#6b7280'
                    }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        fontSize: '9pt',
                        color: '#374151',
                        marginBottom: '3px'
                      }}>
                        <span style={{
                          marginRight: '6px',
                          color: '#1e3a8a',
                          fontWeight: 'bold'
                        }}>•</span>
                        <span style={{ flex: 1 }}>{resp}</span>
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
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '2px'
                }}>
                  <h3 style={{
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#1e3a8a'
                  }}>
                    {edu.degree}
                  </h3>
                  {edu.graduationDate && (
                    <span style={{
                      fontSize: '9pt',
                      color: '#6b7280'
                    }}>
                      {edu.graduationDate}
                    </span>
                  )}
                </div>
                <p style={{
                  fontSize: '10pt',
                  color: '#1f2937',
                  marginBottom: '2px'
                }}>
                  {edu.institution}
                </p>
                {edu.location && (
                  <p style={{
                    fontSize: '9pt',
                    color: '#6b7280'
                  }}>
                    {edu.location}
                  </p>
                )}
                {edu.gpa && (
                  <p style={{
                    fontSize: '9pt',
                    color: '#374151'
                  }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <h3 style={{
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#1e3a8a'
                  }}>
                    {project.name}
                  </h3>
                  {project.startDate && (
                    <span style={{
                      fontSize: '9pt',
                      color: '#6b7280'
                    }}>
                      {project.startDate} - {project.endDate || (project.current ? 'Present' : '')}
                    </span>
                  )}
                </div>
                <p style={{
                  fontSize: '9pt',
                  color: '#374151',
                  marginBottom: '4px'
                }}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <p style={{
                    fontSize: '8pt',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        fontSize: '9pt',
                        color: '#374151',
                        marginBottom: '2px'
                      }}>
                        <span style={{
                          marginRight: '6px',
                          color: '#1e3a8a'
                        }}>•</span>
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
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Publications
            </h2>
            {publications.map((pub, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <p style={{
                  fontSize: '10pt',
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  {pub.title}
                </p>
                <p style={{
                  fontSize: '9pt',
                  color: '#6b7280'
                }}>
                  {pub.publisher} • {pub.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Volunteer */}
        {volunteer && volunteer.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Volunteer Work
            </h2>
            {volunteer.map((vol, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <h3 style={{
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#1e3a8a'
                  }}>
                    {vol.role}
                  </h3>
                  <span style={{
                    fontSize: '9pt',
                    color: '#6b7280'
                  }}>
                    {vol.startDate} - {vol.endDate || (vol.current ? 'Present' : '')}
                  </span>
                </div>
                <p style={{
                  fontSize: '10pt',
                  color: '#1f2937'
                }}>
                  {vol.organization}
                </p>
                {vol.description && (
                  <p style={{
                    fontSize: '9pt',
                    color: '#374151',
                    marginTop: '4px'
                  }}>
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '6px'
            }}>
              Awards & Honors
            </h2>
            {awards.map((award, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <p style={{
                  fontSize: '10pt',
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  {award.title}
                </p>
                <p style={{
                  fontSize: '9pt',
                  color: '#6b7280'
                }}>
                  {award.issuer} • {award.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
