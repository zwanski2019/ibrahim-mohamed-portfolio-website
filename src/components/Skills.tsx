
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
        <div className="flex justify-center mb-12">
          <ToggleGroup type="single" value={activeCategory} onValueChange={(value) => value && setActiveCategory(value as CategoryTab)}>
            {categories.map((category) => (
              <ToggleGroupItem 
                key={category.value} 
                value={category.value}
                className="px-4 py-2 rounded-full text-sm"
              >
                {category.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Skills Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {Object.keys(skillsByCategory).map((category) => (
              <AccordionItem key={category} value={category} className="border-b border-border">
                <AccordionTrigger className="py-4 text-lg font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    {skillsByCategory[category][0].icon && (
                      <span className="text-xl">{skillsByCategory[category][0].icon}</span>
                    )}
                    <span>{categoryNames[category] || category}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-2">
                    {skillsByCategory[category].map((skill) => (
                      <div key={skill.name} className="bg-card rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 flex items-center justify-center text-xl bg-muted rounded-lg">
                            {skill.icon}
                          </div>
                          <h3 className="font-medium">{skill.name}</h3>
                        </div>
                        
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-2 text-right text-sm">{skill.level}%</div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
