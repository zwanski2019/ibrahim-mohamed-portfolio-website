
import { Briefcase, Calendar } from "lucide-react";
import CompanyLogos from "./CompanyLogos";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
};

type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
};

type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
};

const experiences: ExperienceItem[] = [
  {
    id: "el-space",
    title: "Co-working Space Manager",
    company: "El Space Tunis",
    period: "January 2024 – December 2024",
    description: [
      "Designed, updated, and maintained websites using WordPress.",
      "Provided IT support and troubleshooting for coworkers.",
      "Developed applications in Python and Excel to optimize workflows.",
      "Installed and managed Wazuh for system security and threat detection."
    ]
  },
  {
    id: "tino-soft",
    title: "Computer & Phone Repair Technician",
    company: "Tino-soft",
    period: "2017 – 2023",
    description: [
      "Repaired computers and phones in a retail setting.",
      "Installed and configured operating systems and software.",
      "Diagnosed and resolved technical issues for customers."
    ]
  }
];

const education: EducationItem[] = [
  {
    id: "upeople",
    institution: "University of the People",
    degree: "University level Computer Science courses",
    period: "2020"
  },
  {
    id: "mssm",
    institution: "Model Secondary School Maitama, Abuja",
    degree: "High School",
    period: "June 2016"
  },
  {
    id: "waec",
    institution: "West African Examinations Council",
    degree: "High School Diploma",
    period: "June 2016"
  }
];

const certifications: CertificationItem[] = [
  {
    id: "cert1",
    title: "Web Development with PHP, SQL, and jQuery",
    issuer: "Kiron Open Higher Education",
    year: "2025"
  },
  {
    id: "cert2",
    title: "Cybersecurity Awareness Learner",
    issuer: "ISC2",
    year: "2024"
  },
  {
    id: "cert3",
    title: "Database Design & Basic SQL in PostgreSQL",
    issuer: "University of Michigan",
    year: "2024"
  },
  {
    id: "cert4",
    title: "Laser cutting Training",
    issuer: "Orange Digital Center",
    year: "2024"
  },
  {
    id: "cert5",
    title: "Kali Linux Pentesting",
    issuer: "Cybrary",
    year: "2021"
  },
  {
    id: "cert6",
    title: "SQL & HTML Certification",
    issuer: "SoloLearn",
    year: "2019"
  },
  {
    id: "cert7",
    title: "PICO CTF Cybersecurity",
    issuer: "Carnegie Mellon University",
    year: "2019"
  },
  {
    id: "cert8",
    title: "Microsoft Certified Technology Specialist (MCTS): Office SharePoint Server 2007, Configuring",
    issuer: "Sololearn",
    year: "2019"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">Journey</span>
        </h2>
        
        {/* Add the CompanyLogos component at the top of the Experience section */}
        <div className="mb-12">
          <CompanyLogos />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-primary" />
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  
                  <div className="card-3d bg-card rounded-lg p-6 shadow-md border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{exp.title}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="mr-1 h-4 w-4" />
                        {exp.period}
                      </div>
                    </div>
                    
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education & Certification */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <svg className="mr-2 h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                </svg>
                Education
              </h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <h4 className="font-bold">{edu.institution}</h4>
                        <p className="text-muted-foreground">{edu.degree}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="mr-1 h-4 w-4" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <svg className="mr-2 h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="14" x="3" y="4" rx="2"/>
                  <line x1="8" x2="8" y1="2" y2="4"/>
                  <line x1="16" x2="16" y1="2" y2="4"/>
                  <path d="m8 14 2 2 6-5"/>
                </svg>
                Certifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-bold text-sm">{cert.title}</h4>
                    <p className="text-primary text-sm">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
