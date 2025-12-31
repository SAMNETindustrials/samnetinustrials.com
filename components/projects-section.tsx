"use client"

import { GlassmorphicCard } from "./glassmorphic-card"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Smart Home Integration Platform",
    description: "Complete IoT ecosystem for residential and commercial automation with real-time monitoring.",
    category: "IoT Solutions",
    image: "/smart-home-iot.jpg",
    technologies: ["IoT", "Cloud", "Mobile App"],
  },
  {
    id: "2",
    title: "E-Commerce Platform Development",
    description: "Full-stack web application with advanced inventory management and payment integration.",
    category: "Software Development",
    image: "/ecommerce-platform.jpg",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "3",
    title: "Industrial Security System",
    description: "Enterprise-grade CCTV and surveillance solution with AI-powered threat detection.",
    category: "Security Tech",
    image: "/security-cctv-system.jpg",
    technologies: ["AI", "Video Processing", "Cloud"],
  },
  {
    id: "4",
    title: "Wearable Health Monitor",
    description: "Next-generation wearable device for continuous health monitoring and data analytics.",
    category: "Smart Gadgets",
    image: "/wearable-health-device.jpg",
    technologies: ["Embedded Systems", "Mobile", "Cloud"],
  },
  {
    id: "5",
    title: "Manufacturing Automation Suite",
    description: "Robotics and automation solution for industrial production line optimization.",
    category: "Manufacturing",
    image: "/manufacturing-robotics.jpg",
    technologies: ["Robotics", "Control Systems", "Analytics"],
  },
  {
    id: "6",
    title: "Digital Transformation Consulting",
    description: "End-to-end digital transformation implementation for enterprise clients.",
    category: "Consulting",
    image: "/digital-transformation.jpg",
    technologies: ["Cloud", "Strategy", "Implementation"],
  },
]

export function ProjectsSection() {
  return (
    <section className="py-8 relative z-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer hover:border-cyan-400/50 transition-all">
              <GlassmorphicCard>
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block px-3 py-1 bg-cyan-500/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
              <p className="text-sm text-blue-200 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-blue-900/50 text-cyan-300 rounded border border-blue-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-blue-900/50 group/btn"
              >
                View Project
              </Button>
              </GlassmorphicCard>
            </div>
          ))}
          {""}
        </div>
      </div>
    </section>
  )
}
