
import type { IconType } from 'react-icons';
import { getCommonTechIcon as resolveCommonTechIcon } from '@/lib/react-icons';
export { getCommonTechIcon } from '@/lib/react-icons';

export interface OurWork {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'web' | 'mobile' | 'design' | 'consulting' | 'ai' | 'other';
  imageUrl: string;
  imageAlt: string;
  client?: string;
  year: number;
  technologies: string[];
  features: string[];
  results?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  link?: string;
  featured: boolean;
}
export const ourWorkData: OurWork[] = [
  {
    id: 'project-001',
    title: 'Ceylanraytravels Tour Booking Platform',
    subtitle: 'Modernized tour experience with various packages',
    description: '',
    category: 'web',
    imageUrl: '/our-work/ceylanray/ceylanray.png',
    imageAlt: 'Tour booking platform interface',
    client: 'ceylanraytravels',
    year: 2025,
    technologies: ['React', 'Node.js', 'TailwindCSS', 'EmailJS'],
    features: [
      'User-friendly booking system',
      'Responsive design',
      'Package customization',
    ],
    results: [
      '45% increase in conversion rate',
      '60% improvement in page load time',
      'Enhanced user engagement'
    ],
    link: 'ceylanraytravels.com',
    featured: true
  },
  {
    id: 'project-002',
    title: 'Courtlink Indoor court Booking System',
    subtitle: 'Modernized tour experience with various packages',
    description: '',
    category: 'web',
    imageUrl: '/our-work/courtlink/courtlink-home.png',
    imageAlt: 'Tour booking platform interface',
    client: 'ceylanraytravels',
    year: 2025,
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    features: [
      'User-friendly booking system',
      'Responsive design',
      'Payment Gateway Integration',
      'Real-time availability updates',
      'Real time notifications',
      'Admin Management Dashboard',
      'Review and Rating System',
      'Real-time account activity tracking',
      'Real time IP address tracking',
      'User managment system'
    ],
    results: [
      '45% increase in conversion rate',
      '60% improvement in page load time',
      'Enhanced user engagement'
    ],
    link: '',
    featured: true
  },
  {
    id: 'project-004',
    title: 'Vebula Space',
    subtitle: 'Modernized 3D experience',
    description: '',
    category: 'web',
    imageUrl: '/our-work/vebula/vebula.png',
    imageAlt: 'Vebula Space interface',
    client: 'vebula',
    year: 2025,
    technologies: ['Next.js', 'Three.js', 'Blender', 'TailwindCSS'],
    features: [
      'customizable product options',
      'Responsive design',
      'Payment Gateway Integration',
    ],
    results: [
      '45% increase in conversion rate',
      '60% improvement in page load time',
      'Enhanced user engagement'
    ],
    link: 'https://vebula.space',
    featured: true
  },
   {
    id: 'project-003',
    title: 'Shako Headgear Customization Platform',
    subtitle: 'Modernized tour experience with various packages',
    description: '',
    category: 'web',
    imageUrl: '/our-work/shako/shako.png',
    imageAlt: 'shako helmets',
    client: 'shako',
    year: 2025,
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'TailwindCSS'],
    features: [
      'customizable product options',
      'Responsive design',
      'Payment Gateway Integration',
    ],
    results: [
      '45% increase in conversion rate',
      '60% improvement in page load time',
      'Enhanced user engagement'
    ],
    link: 'https://helmets.shako.lk',
    featured: true
  }
];

export function getWorkTechIcons(work: OurWork): IconType[] {
  return work.technologies
    .map((t) => resolveCommonTechIcon(t))
    .filter((i): i is IconType => i !== null);
}

/**
 * Utility function to get work by ID
 */
export function getWorkById(id: string): OurWork | undefined {
  return ourWorkData.find(work => work.id === id);
}

/**
 * Utility function to get featured works
 */
export function getFeaturedWorks(): OurWork[] {
  return ourWorkData.filter(work => work.featured);
}

/**
 * Utility function to get works by category
 */
export function getWorksByCategory(category: OurWork['category']): OurWork[] {
  return ourWorkData.filter(work => work.category === category);
}

/**
 * Utility function to get works by year
 */
export function getWorksByYear(year: number): OurWork[] {
  return ourWorkData.filter(work => work.year === year);
}

/**
 * Utility function to search works
 */
export function searchWorks(query: string): OurWork[] {
  const lowerQuery = query.toLowerCase();
  return ourWorkData.filter(work =>
    work.title.toLowerCase().includes(lowerQuery) ||
    work.description.toLowerCase().includes(lowerQuery) ||
    work.technologies.some(tech => tech.toLowerCase().includes(lowerQuery)) ||
    work.client?.toLowerCase().includes(lowerQuery)
  );
}
