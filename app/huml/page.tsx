"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { HuMLRegistrationModal } from "@/components/huml-registration-modal"

export default function HuMLPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 z-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10">
          <div className="space-y-8 text-center max-w-5xl mx-auto">
            {/* HuML Logo */}
            <div className="inline-block animate-pulse">
              <img
                src="/huml_logo.png"
                alt="HuML Logo"
                className="h-48 w-auto mx-auto"
              />
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
                  Human Machine Learning
                </span>
              </h1>
              <p className="text-3xl md:text-4xl font-bold text-white mb-4">
                Train like a model. Perform like a pro.
              </p>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto text-pretty">
                HuML is a revolutionary training pipeline that applies machine learning principles to human development. We use proven AI-inspired methodologies to train individuals to think systematically, perform optimally, and continuously evolve.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                onClick={() => setIsRegistrationOpen(true)}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-cyan-500 border-0 hover:from-cyan-500 hover:to-blue-500 text-lg px-8 py-6"
              >
                <span className="relative z-10 flex items-center">
                  Register Now{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-blue-400/50 text-blue-300 hover:text-blue-200 hover:border-blue-300 bg-transparent text-lg px-8 py-6"
              >
                Learn More
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

      {/* HuML Components Section */}
      <section className="py-20 relative z-0">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The HuML Ecosystem</h2>
            <p className="text-xl text-blue-100">
              A comprehensive approach to human development through specialized environments and training methodologies
            </p>
          </div>

          {/* HuML Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">🏋️</div>
              <h3 className="text-xl font-bold mb-3">Physical Data Center</h3>
              <p className="text-blue-100">
                State-of-the-art facilities equipped with fitness and wellness infrastructure to support holistic development and physical well-being during training.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">Cognitive Lab</h3>
              <p className="text-blue-100">
                Advanced learning environments where participants engage in problem-solving, critical thinking exercises, and hands-on technical projects.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">🧘</div>
              <h3 className="text-xl font-bold mb-3">Reflection Pods</h3>
              <p className="text-blue-100">
                Dedicated spaces for introspection and mindfulness, allowing participants to process learning, set goals, and develop self-awareness.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Data Wall</h3>
              <p className="text-blue-100">
                Real-time performance visualization and analytics dashboard tracking progress, metrics, and personalized insights for continuous improvement.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">🧪</div>
              <h3 className="text-xl font-bold mb-3">Snitfountains</h3>
              <p className="text-blue-100">
                Collaborative workstations designed for team-based learning, knowledge exchange, and practical skill development in social environments.
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="text-3xl font-bold text-cyan-400 mb-4">📝</div>
              <h3 className="text-xl font-bold mb-3">Rotest</h3>
              <p className="text-blue-100">
                Continuous assessment and evaluation framework ensuring knowledge retention, skill mastery, and readiness for real-world applications.
              </p>
            </GlassmorphicCard>
          </div>

          {/* HuML Schema Image */}
          <div className="mb-16">
            <div className="rounded-xl overflow-hidden border border-blue-500/30">
              <img
                src="/huml_schema.png"
                alt="HuML Training Schema"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Pipeline Section */}
      <section className="py-20 relative z-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The HuML Training Pipeline</h2>
            <p className="text-xl text-blue-100">
              A structured, iterative approach to human development with five key stages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                stage: "Stage 1",
                title: "Onboarding",
                description: "Initial assessment, goal-setting, and introduction to the HuML methodology and environment.",
                icon: "✓",
              },
              {
                stage: "Stage 2",
                title: "Training Loops",
                description: "Intensive, iterative learning cycles combining theory, practice, and feedback in repeated cycles.",
                icon: "🔄",
              },
              {
                stage: "Stage 3",
                title: "Regularization",
                description: "Optimization and refinement of skills, habits, and knowledge to achieve consistent high performance.",
                icon: "⚙️",
              },
              {
                stage: "Stage 4",
                title: "Continuous Learning",
                description: "Ongoing development, mentorship, and engagement with evolving technologies and methodologies.",
                icon: "♾️",
              },
              {
                stage: "Stage 5",
                title: "Performance Ready",
                description: "Mastery achieved - prepared for real-world application and professional excellence.",
                icon: "🚀",
              },
            ].map((stage, index) => (
              <div key={index} className="text-center">
                <GlassmorphicCard>
                  <div className="text-4xl mb-4">{stage.icon}</div>
                  <div className="text-sm text-cyan-400 font-semibold mb-2">{stage.stage}</div>
                  <h3 className="text-lg font-bold mb-3">{stage.title}</h3>
                  <p className="text-blue-100 text-sm">{stage.description}</p>
                </GlassmorphicCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employment Roles Section */}
      <section className="py-20 relative z-0">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">HuML Employment Roles</h2>
            <p className="text-xl text-blue-100">
              Multiple pathways to engagement within the HuML ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Model (Learner)",
                description: "Actively participate in the training pipeline, absorb knowledge, develop skills, and progress through stages.",
              },
              {
                role: "Trainer (Coach)",
                description: "Experienced professionals who guide learners, provide feedback, and facilitate the training process.",
              },
              {
                role: "Human ML Engineer",
                description: "Specialized role designing training programs, optimizing learning pathways, and ensuring program effectiveness.",
              },
              {
                role: "Dataset Curator",
                description: "Professionals managing learning materials, resources, and real-world case studies for practical training.",
              },
            ].map((role, index) => (
              <GlassmorphicCard key={index}>
                <div className="text-4xl font-bold text-cyan-400 mb-4">
                  {["👤", "🎯", "🔧", "📚"][index]}
                </div>
                <h3 className="text-lg font-bold mb-3">{role.role}</h3>
                <p className="text-blue-100">{role.description}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why HuML Section */}
      <section className="py-20 relative z-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose HuML?</h2>
              <ul className="space-y-4">
                {[
                  "AI-Inspired Methodology: Proven algorithms adapted for human learning",
                  "Comprehensive Development: Physical, cognitive, and emotional growth",
                  "Continuous Optimization: Regular feedback and adjustment cycles",
                  "Real-World Application: Hands-on projects and practical experience",
                  "Expert Guidance: Mentorship from industry professionals",
                  "Performance Guarantee: Measurable results and skill development",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-full">
              <GlassmorphicCard>
                <h3 className="text-2xl font-bold mb-6">HuML Guarantee</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-cyan-400 font-semibold mb-2">COMMITMENT</p>
                    <p className="text-blue-100">
                      We commit to transforming passionate individuals into skilled professionals through systematic, evidence-based training.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-cyan-400 font-semibold mb-2">METHODOLOGY</p>
                    <p className="text-blue-100">
                      Our AI-inspired pipeline ensures optimal learning outcomes through iterative cycles of knowledge acquisition and skill refinement.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-cyan-400 font-semibold mb-2">OUTCOME</p>
                    <p className="text-blue-100">
                      Graduates emerge as confident, capable professionals ready to excel in their chosen field.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-0">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="p-12 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-blue-500/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Potential?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join HuML today and experience a revolutionary approach to professional development. Train like a model. Perform like a pro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => setIsRegistrationOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-lg px-8 py-6"
              >
                <Zap className="mr-2 h-5 w-5" />
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 bg-transparent text-lg px-8 py-6"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-800/50 py-8 relative z-0">
        <div className="max-w-7xl mx-auto px-4">
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
              <h4 className="font-semibold text-cyan-300 mb-4">HuML</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>
                  <button onClick={() => setIsRegistrationOpen(true)} className="hover:text-cyan-400 transition-colors">
                    Register
                  </button>
                </li>
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">
                    About HuML
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-4">SAMNET</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700/50 pt-8">
            <p className="text-sm text-center text-blue-400">
              Train like a model. Perform like a pro. — HuML™
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {isRegistrationOpen && (
        <HuMLRegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      )}
    </div>
  )
}
