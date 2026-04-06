export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  features: string[];
  readTime: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "2",
    title: "Building UNISYNC — A Secure LMS Platform for Modern Digital Education",
    excerpt: `UNISYNC is a next-generation Learning Management System developed by ZGenLabs to modernize digital education through security, scalability, and intelligent academic management. Built to address the growing challenges faced by universities, institutes, and training organizations, UNISYNC provides a centralized platform that seamlessly connects administrators, academic staff, and students within a secure digital ecosystem.
    Traditional learning systems often struggle with fragmented tools, weak access control, and inefficient academic workflows. UNISYNC solves these problems by introducing a unified platform where course delivery, assessments, academic resources, and institutional communication operate together in a streamlined environment.
    At its core, UNISYNC is engineered with enterprise-grade security using JWT authentication and Role-Based Access Control (RBAC), ensuring that each user — whether admin, lecturer, or student — accesses only the resources relevant to their role. This architecture strengthens data protection while maintaining a smooth and intuitive user experience.
    The platform enables educators to manage courses, modules, assignments, and learning materials efficiently while supporting structured academic workflows. A secure examination system integrated with Safe Exam Browser technology helps institutions conduct online assessments with integrity, reducing academic malpractice and improving trust in digital evaluations.
    Beyond course management, UNISYNC delivers powerful result processing and academic analytics, allowing institutions to track performance, monitor progress, and make data-driven academic decisions. Built-in notice management and resource distribution features further enhance communication between departments and learners.
    Designed with modern web technologies and scalable architecture, UNISYNC reflects ZGenLabs’ vision of building reliable software solutions for the future of education. The system is not only a learning platform but a complete academic operations hub — enabling institutions to transition confidently into fully digital learning environments.
    UNISYNC represents a step forward in educational technology: secure, efficient, and engineered for modern digital education.`,
    date: "April 6, 2026",
    category: "Products",
    image: "/blog/unisync.png", // replace with your LMS dashboard screenshot path
    author: {
      name: "Dinuka Prathap",
      role: "Lead Developer",
      avatar: "/team/dinuka.jpg",
    },
    features: [
      "JWT Authentication & Role-Based Access Control",
      "Course, Module & Assignment Management",
      "Secure Exam System with Safe Exam Browser",
      "Result Processing & Academic Analytics",
      "Multi-role Access: Admin, Staff, Students",
      "Notice & Resource Management",
    ],
    readTime: "6 min read",
    slug: "building-unisync-secure-lms",
  }
];
