import { Code, Smartphone, Palette, MessageSquare, Settings, Terminal, Users, Zap, Box } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export const servicesData: Service[] = [
  {
    icon: Code,
    title: "WEB DEVELOPMENT",
    subtitle: "STATIC & DYNAMIC",
    description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    features: ["Static Websites", "Dynamic Web Apps", "E-commerce Platforms", "Content Management Systems"]
  },
  {
    icon: Zap,
    title: "WEB SYSTEMS",
    subtitle: "ENTERPRISE SOLUTIONS",
    description: "Scalable web systems designed to handle complex business processes and high-traffic applications.",
    features: ["Enterprise Portals", "Business Automation", "Data Management", "Cloud Integration"]
  },
  {
    icon: Smartphone,
    title: "APP DEVELOPMENT",
    subtitle: "MOBILE & DESKTOP",
    description: "Native and cross-platform applications for iOS, Android, and desktop environments.",
    features: ["iOS Applications", "Android Applications", "Cross-platform Apps", "Desktop Software"]
  },
  {
    icon: Palette,
    title: "UI/UX DESIGN",
    subtitle: "USER EXPERIENCE",
    description: "Intuitive and engaging user interfaces designed to enhance user satisfaction and conversion rates.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
  },
  {
    icon: Users,
    title: "WEB CONSULTATION",
    subtitle: "STRATEGIC GUIDANCE",
    description: "Expert consultation to help you make informed decisions about your digital transformation journey.",
    features: ["Technology Stack", "Architecture Planning", "Performance Optimization", "Security Assessment"]
  },
  {
    icon: Settings,
    title: "MICROSERVICES",
    subtitle: "SCALABLE ARCHITECTURE",
    description: "Modular microservices architecture for better scalability, maintainability, and deployment flexibility.",
    features: ["API Development", "Service Architecture", "Container Solutions", "Cloud Deployment"]
  },
  {
    icon: MessageSquare,
    title: "AI/ML PROJECTS",
    subtitle: "AI AUTOMATION",
    description: "Intelligent chatbot solutions to automate customer support and enhance user engagement.",
    features: ["AI Chatbots", "Live Chat Integration", "Customer Support", "Lead Generation"]
  },
  {
    icon: Terminal,
    title: "CONSOLE APPS",
    subtitle: "AUTOMATION TOOLS",
    description: "Custom console applications and command-line tools for business process automation and data processing.",
    features: ["CLI Tools", "Data Processing", "Automation Scripts", "System Integration"]
  },
  {
    icon: Box,
    title: "3D SOLUTIONS",
    subtitle: "IMMERSIVE EXPERIENCES",
    description: "High-fidelity 3D modeling, visualization, and interactive experiences for web and applications using cutting-edge technologies.",
    features: ["3D Modeling", "Web GL Visualization", "Interactive Experiences", "Real-time Rendering"]
  }
];
