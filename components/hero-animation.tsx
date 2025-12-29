"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rawCtx = canvas.getContext("2d")
    if (!rawCtx) return
    const ctx = rawCtx as CanvasRenderingContext2D

    // Retina scaling and dimensions
    let devicePixelRatio = window.devicePixelRatio || 1
    let width = 0
    let height = 0

    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      width = rect.width
      height = rect.height

      canvas.width = Math.max(1, Math.floor(width * devicePixelRatio))
      canvas.height = Math.max(1, Math.floor(height * devicePixelRatio))

      // Set transform to map drawing coordinates to CSS pixels directly
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number | null = null

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      ctx.strokeStyle = "rgba(120, 180, 255, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}
