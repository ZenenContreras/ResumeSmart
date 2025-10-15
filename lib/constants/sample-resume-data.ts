// Sample resume data for template previews
export const SAMPLE_RESUME_DATA = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.com"
  },
  summary: "Results-driven professional with 5+ years of experience in software development and team leadership. Proven track record of delivering high-quality solutions and driving business growth through innovative technology implementations.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "Jan 2020",
      endDate: "Present",
      responsibilities: [
        "Led team of 5 engineers in developing microservices architecture, reducing system latency by 40%",
        "Implemented CI/CD pipeline that decreased deployment time from 2 hours to 15 minutes",
        "Mentored junior developers and conducted code reviews, improving code quality by 30%"
      ]
    },
    {
      title: "Software Engineer",
      company: "StartUp Inc",
      location: "San Francisco, CA",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      responsibilities: [
        "Developed RESTful APIs using Node.js and Express, serving 100K+ daily requests",
        "Built responsive web applications with React, increasing user engagement by 25%"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "Boston, MA",
      graduationDate: "May 2018",
      gpa: "3.8"
    }
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS"],
    tools: ["Git", "Docker", "Jenkins", "MongoDB", "PostgreSQL"],
    soft: ["Leadership", "Communication", "Problem Solving", "Agile/Scrum"]
  },
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022"
    },
    {
      name: "Professional Scrum Master",
      issuer: "Scrum.org",
      date: "2021"
    }
  ],
  languages: ["English (Native)", "Spanish (Fluent)"],
  awards: ["Employee of the Year 2022 - Tech Corp", "Best Innovation Award 2020 - StartUp Inc"]
};

export type SampleResumeData = typeof SAMPLE_RESUME_DATA;
