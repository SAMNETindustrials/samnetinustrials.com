import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Zap, Cpu, Smartphone, Shield, Code2, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { ServiceCard } from "@/components/service-card"

export default function SAMNETPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <CreativeHero />
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10">
          <div className="space-y-8 text-center max-w-4xl mx-auto">
            <div className="inline-block">
              <img
                src="/images/samnetlogo1-removebg-preview.png"
                alt="SAMNET Industrials Logo"
                className="h-24 w-24 mx-auto mb-6"
              />
            </div>

            <div className="inline-block">
              <div className="relative px-4 py-2 text-sm font-medium rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 mb-4">
                <span className="relative z-10">Innovating Technology Solutions</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-pulse"></span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="block mb-2">SAMNET</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
                Industrials
              </span>
            </h1>

            <p className="text-xl text-blue-100 max-w-[700px] mx-auto text-pretty">
              Transforming businesses through innovative software solutions, cutting-edge IoT devices, smart gadgets,
              and next-generation tech talent development.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-cyan-500 border-0 hover:from-cyan-500 hover:to-blue-500">
                <span className="relative z-10 flex items-center">
                  Explore Solutions{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-blue-400/50 text-blue-300 hover:text-blue-200 hover:border-blue-300 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-blue-400/40 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Our Services" subtitle="Comprehensive tech solutions for modern businesses" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <ServiceCard
              icon={<Code2 className="h-6 w-6" />}
              title="Software Development"
              description="Custom web and mobile applications built with cutting-edge technologies and best practices."
            />
            <ServiceCard
              icon={<Cpu className="h-6 w-6" />}
              title="IoT & Smart Systems"
              description="Industrial hardware and IoT solutions for home automation, wearables, and smart device integration."
            />
            <ServiceCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Smart Gadgets"
              description="Innovative consumer electronics and wearable technology designed for modern lifestyles."
            />
            <ServiceCard
              icon={<Zap className="h-6 w-6" />}
              title="Manufacturing"
              description="Advanced manufacturing of industrial hardware and consumer electronics with quality assurance."
            />
            <ServiceCard
              icon={<Shield className="h-6 w-6" />}
              title="Security & CCTV"
              description="Enterprise-grade security technology and surveillance solutions for maximum protection."
            />
            <ServiceCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Digital Innovation"
              description="End-to-end digital transformation consulting and implementation services."
            />
          </div>
        </div>
      </section>

      {/* Training Hub Section */}
      <section id="training" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">SAMNET Training Hub</h2>
              <p className="text-xl text-blue-100 mb-8">
                <span className="font-semibold text-cyan-300">Passion is enough — skills will be taught.</span>
              </p>
              <p className="text-lg text-blue-200">
                We attract passionate students and introduce them to cutting-edge technology fields with scholarship
                opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-4 text-cyan-300">Training Programs</h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>Software Development & Web Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>Mobile App Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>UI/UX & Product Design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>CAD & Engineering Design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>Robotics & Automation</span>
                  </li>
                </ul>
              </GlassmorphicCard>

              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-4 text-cyan-300">More Specializations</h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>IoT & Smart Systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>3D Printing & Additive Manufacturing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>CCTV & Security Technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>Branding & Creative Design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">▸</span>
                    <span>Industry-Expert Mentorship</span>
                  </li>
                </ul>
              </GlassmorphicCard>
            </div>

            <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 text-center">
              <h3 className="text-2xl font-bold mb-4">Scholarship Opportunities Available</h3>
              <p className="text-blue-100 mb-6">
                We believe in nurturing talent. Merit-based and need-based scholarships are available for deserving
                students who are passionate about technology.
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0">
                Learn More & Apply
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-32 relative">
        <div className="container relative z-10">
          <SectionHeading title="Why Choose SAMNET?" subtitle="Setting new standards in tech innovation" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <GlassmorphicCard>
              <div className="text-4xl font-bold text-cyan-400 mb-4">10+</div>
              <h3 className="text-xl font-bold mb-3">Years of Excellence</h3>
              <p className="text-blue-200">
                Proven track record of delivering innovative solutions across diverse industries and markets.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-4xl font-bold text-cyan-400 mb-4">10+</div>
              <h3 className="text-xl font-bold mb-3">Projects Completed</h3>
              <p className="text-blue-200">
                From startups to enterprises, we've successfully delivered transformative tech solutions.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-4xl font-bold text-cyan-400 mb-4">10+</div>
              <h3 className="text-xl font-bold mb-3">Trained Professionals</h3>
              <p className="text-blue-200">
                Passionate individuals transformed into skilled tech professionals through our training programs.
              </p>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's build the future together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-300">Email</div>
                    <div className="font-medium">info@samnetindustrials.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-300">Phone</div>
                    <div className="font-medium">+234 (90) 27349707</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-300">Business Hours</div>
                    <div className="font-medium">Mon - Fri, 8:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-blue-700/50">
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-blue-900/50 hover:bg-blue-800 text-cyan-400 hover:text-cyan-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-blue-900/50 hover:bg-blue-800 text-cyan-400 hover:text-cyan-300"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-800/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Link href="/" className="font-bold text-xl inline-flex items-center gap-2 mb-4">
                <img src="/images/samnetlogo1-removebg-preview.png" alt="SAMNET Logo" className="h-8 w-8" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">SAMNET</span>
              </Link>
              <p className="text-sm text-blue-300">
                © {new Date().getFullYear()} SAMNET Industrials. All rights reserved.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>
                  <Link href="#services" className="hover:text-cyan-400 transition-colors">
                    Software Development
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-cyan-400 transition-colors">
                    IoT Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#training" className="hover:text-cyan-400 transition-colors">
                    Training Programs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>
                  <Link href="#about" className="hover:text-cyan-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/50 pt-8 text-center text-sm text-blue-400">
            <p>Building the future of technology, one innovation at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
