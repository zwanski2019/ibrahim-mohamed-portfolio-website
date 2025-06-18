
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Skill = {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "languages";
  icon: string;
};

const skills: Skill[] = [
  { name: "HTML", level: 90, category: "frontend", icon: "🌐" },
  { name: "CSS", level: 85, category: "frontend", icon: "🎨" },
  { name: "JavaScript", level: 85, category: "frontend", icon: "⚡" },
  { name: "jQuery", level: 80, category: "frontend", icon: "🔌" },
  { name: "React", level: 75, category: "frontend", icon: "⚛️" },
  { name: "Bootstrap", level: 90, category: "frontend", icon: "📱" },
  { name: "PHP", level: 80, category: "backend", icon: "🐘" },
  { name: "SQL", level: 85, category: "backend", icon: "🗃️" },
  { name: "WordPress", level: 95, category: "tools", icon: "📝" },
  { name: "Magento", level: 70, category: "tools", icon: "🛒" },
  { name: "Cybersecurity", level: 80, category: "tools", icon: "🔒" },
  { name: "C/C++", level: 70, category: "languages", icon: "🧠" },
  { name: "Java", level: 65, category: "languages", icon: "☕" },
  { name: "Python", level: 75, category: "languages", icon: "🐍" },
  { name: "English", level: 90, category: "languages", icon: "🇬🇧" },
  { name: "French", level: 90, category: "languages", icon: "🇫🇷" },
  { name: "Arabic", level: 85, category: "languages", icon: "🇹🇳" },
  { name: "Hausa", level: 85, category: "languages", icon: "🌍" },
  { name: "Berber", level: 85, category: "languages", icon: "🌍" },
];

type CategoryTab = "all" | "frontend" | "backend" | "tools" | "languages";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const categories: { value: CategoryTab; label: string }[] = [
    { value: "all", label: "All Skills" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "tools", label: "Tools & CMS" },
    { value: "languages", label: "Languages" },
  ];

  // Group skills by category for the accordion view
  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Create category display names
  const categoryNames: Record<string, string> = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    tools: "Tools & CMS",
    languages: "Programming & Human Languages"
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            My <span className="text-gradient">Skills</span>
          </h2>
          
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            A comprehensive overview of my technical abilities and expertise gained through years of
            professional experience and continuous learning.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 p-2 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-elevation-3'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(skillsByCategory).map((category) => (
              <div
                key={category}
                className="group p-8 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
              >
                {/* Background glow effects */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-2xl">{skillsByCategory[category][0].icon}</span>
                    {categoryNames[category] || category}
                  </h3>
                  
                  <div className="space-y-4">
                    {skillsByCategory[category].map((skill) => (
                      <div key={skill.name} className="bg-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{skill.icon}</span>
                            <h4 className="font-semibold text-white">{skill.name}</h4>
                          </div>
                          <span className="text-blue-400 font-bold">{skill.level}%</span>
                        </div>
                        
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
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
