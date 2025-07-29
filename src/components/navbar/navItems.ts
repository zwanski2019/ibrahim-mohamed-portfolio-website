import {
  Activity,
  Bot,
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  Home,
  LifeBuoy,
  Mail,
  MessageSquare,
  PenTool,
  Phone,
  Rss,
  Settings,
  Settings2,
  Shield,
  Wrench,
  Users,
  Info,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  {
    label: "Fix",
    path: "/services?category=repair",
    icon: Wrench,
    description: "Device Repair & Recovery",
  },
  {
    label: "Build",
    path: "/services?category=development",
    icon: Briefcase,
    description: "Custom Development",
  },
  {
    label: "Secure",
    path: "/services?category=security",
    icon: Shield,
    description: "Cybersecurity Solutions",
  },
  {
    label: "Teach",
    path: "/academy",
    icon: GraduationCap,
    description: "Education & Training",
  },
  { label: "Tools", path: "/tools", icon: Settings2 },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Blog", path: "/blog", icon: PenTool },
  { label: "Freelancers", path: "/freelancers", icon: Users },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Newsletter", path: "/newsletter", icon: Mail },
  { label: "3D Model", path: "/3d", icon: BookOpen },
  { label: "Migrant Support", path: "/migrant-support", icon: Globe },
  { label: "Support", path: "/support", icon: LifeBuoy },
  { label: "Threat Map", path: "/threat-map", icon: Activity },
  { label: "AI", path: "/ai", icon: Bot },
  { label: "About", path: "/about", icon: Info },
  { label: "FAQ", path: "/faq", icon: FileText },
  { label: "IMEI Check", path: "/imei-check", icon: Phone },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-of-service" },
  { label: "RSS", path: "/rss", icon: Rss },
];

export const NAV_DISPLAY_LIMIT = 7;

