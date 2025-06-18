
import { MapPin, Calendar, ExternalLink } from "lucide-react";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
};

const experiences: ExperienceItem[] = [
  {
    id: "zwanski-tech",
    title: "Founder & Lead Developer",
    company: "ZWANSKI TECH",
    location: "Tunisia / Remote",
    period: "2019 - Present",
    description: "Founded and built a comprehensive digital solutions company specializing in web development, IT support, and cybersecurity services.",
    achievements: [
      "Built and maintained 15+ professional websites for international clients",
      "Developed custom WordPress themes and plugins for e-commerce solutions",
      "Provided IT support and system security for 300+ devices",
      "Achieved 98% customer satisfaction rate across all service categories"
    ],
    technologies: ["PHP", "WordPress", "JavaScript", "React", "Python", "Cybersecurity"],
    link: "https://zwanski.org"
  },
  {
    id: "freelance-web-dev",
    title: "Freelance Web Developer",
    company: "Various Clients",
    location: "Remote",
    period: "2020 - Present",
    description: "Delivered custom web solutions for businesses across different industries, focusing on modern technologies and user experience.",
    achievements: [
      "Completed 25+ web development projects with 100% on-time delivery",
      "Specialized in responsive design and mobile-first development",
      "Implemented SEO strategies resulting in 65% average traffic increase",
      "Developed e-commerce solutions processing $100K+ in transactions"
    ],
    technologies: ["React", "WordPress", "Magento", "SEO", "JavaScript", "CSS"],
  },
  {
    id: "it-consultant",
    title: "IT Consultant",
    company: "Small & Medium Businesses",
    location: "Tunisia",
    period: "2019 - Present",
    description: "Provided comprehensive IT consulting services including system optimization, security audits, and digital transformation strategies.",
    achievements: [
      "Conducted security audits for 50+ business systems",
      "Reduced system downtime by 40% through proactive maintenance",
      "Implemented backup and disaster recovery solutions",
      "Trained teams on cybersecurity best practices"
    ],
    technologies: ["System Administration", "Cybersecurity", "Network Security", "Backup Solutions"],
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Over 5 years of experience building digital solutions, leading projects, and delivering exceptional results for clients worldwide.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="group p-8 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
              >
                {/* Background glow effects */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
                        {experience.link && (
                          <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                            aria-label={`Visit ${experience.company} website`}
                          >
                            <ExternalLink className="h-4 w-4 text-blue-400" />
                          </a>
                        )}
                      </div>
                      
                      <h4 className="text-xl text-emerald-400 font-semibold mb-3">{experience.company}</h4>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>{experience.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6">{experience.description}</p>

                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-white mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">Technologies & Skills:</h5>
                    <div className="flex flex-wrap gap-3">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-slate-300 text-sm border border-slate-600/30 hover:border-blue-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
