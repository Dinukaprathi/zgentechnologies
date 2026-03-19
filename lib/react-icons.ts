import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiNextdotjs,
  SiVite,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJquery,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiExpress,
  SiDjango,
  SiFlask,
  SiMysql,
  SiRedis,
  SiFigma,
  SiCss,
  SiNestjs,
  SiThreedotjs,
  SiBlender,
} from 'react-icons/si';

const techIconMap: Record<string, IconType> = {
  // Frontend
  react: SiReact,
  'react.js': SiReact,
  reactjs: SiReact,
  vue: SiVuedotjs,
  'vue.js': SiVuedotjs,
  vuejs: SiVuedotjs,
  angular: SiAngular,
  svelte: SiSvelte,
  html: SiHtml5,
  'html5': SiHtml5,
  css: SiCss,
  'css3': SiCss,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  jquery: SiJquery,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,

  // Backend
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  express: SiExpress,
  'express.js': SiExpress,
  python: SiPython,
  django: SiDjango,
  flask: SiFlask,
  nestjs: SiNestjs,
  'nest.js': SiNestjs,

  // Next.js / Frameworks
  next: SiNextdotjs,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  vite: SiVite,
  'three.js': SiThreedotjs,
  threejs: SiThreedotjs,
  blender: SiBlender,

  // Databases
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  mysql: SiMysql,
  redis: SiRedis,

  // DevOps / Tools
  docker: SiDocker,
  git: SiGit,

  // Design
  figma: SiFigma,

  // Email / Services
  emailjs: SiJavascript, // fallback since no emailjs icon
};

export const getCommonTechIcon = (techName: string): IconType | null => {
  if (!techName) return null;
  const normalizedName = techName.toLowerCase().trim();
  return techIconMap[normalizedName] || null;
};
