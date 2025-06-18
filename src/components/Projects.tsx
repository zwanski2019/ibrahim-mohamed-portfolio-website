
import { ExternalLink, Github, Monitor } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  year: string;
};

const projects: Project[] = [
  {
    id: "zwansave",
    title: "Zwansave Dashboard",
    description: "A Chrome tool developed to optimize memory and CPU usage for improved browser performance.",
    technologies: ["Python", "Chrome Extensions"],
    github: "https://github.com/zwanski2019",
    year: "2024"
  },
  {
    id: "websites",
    title: "Website Development",
    description: "Developed and maintained multiple professional websites for businesses, including elfabspace.net, elspace.co, yabservice.com, and ihstgroup.com.",
    technologies: ["PHP", "WordPress", "HTML", "JavaScript"],
    link: "https://elspace.co",
    year: "2024"
  },
  {
    id: "theme-tracker",
    title: "WordPress Theme Tracker",
    description: "Designed a tool for tracking WordPress themes and updates to efficiently maintain multiple WordPress installations.",
    technologies: ["PHP", "WordPress"],
    github: "https://github.com/zwanski2019",
    year: "2023"
  },
  {
    id: "eurorbit",
    title: "EurOrbit",
    description: "A European weather forecast tool providing accurate and timely weather updates across Europe.",
    technologies: ["HTML", "JavaScript"],
    link: "https://zwanski2019.github.io/eurorbit",
    github: "https://github.com/zwanski2019/eurorbit",
    year: "2022"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            My <span className="text-gradient">Projects</span>
          </h2>
          
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            A showcase of my recent work, highlighting my skills in web development, application design, and problem-solving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              className="group p-8 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
            >
              {/* Background glow effects */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.year}</p>
                  </div>
                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                        aria-label={`Visit ${project.title} website`}
                      >
                        <ExternalLink className="h-5 w-5 text-blue-400" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <Github className="h-5 w-5 text-emerald-400" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-slate-300 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-slate-300 text-sm border border-slate-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Icon display based on project type */}
                <div className="absolute top-6 right-6 opacity-10 text-blue-400">
                  <Monitor className="h-16 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
