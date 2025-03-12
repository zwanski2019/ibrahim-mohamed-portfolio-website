
import { useState } from "react";

type Skill = {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "languages";
  icon: string; // Using emojis as simple icons
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

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">Skills</span>
        </h2>
        
        <p className="section-subtitle">
          A comprehensive overview of my technical abilities and expertise gained through years of
          professional experience and continuous learning.
        </p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="card-3d glass-card rounded-xl overflow-hidden transform-gpu"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl bg-muted rounded-xl">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{skill.category}</p>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                
                <div className="mt-2 text-right text-sm">{skill.level}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
