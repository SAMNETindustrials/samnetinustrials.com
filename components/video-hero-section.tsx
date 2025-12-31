"use client"

import { Play } from "lucide-react"
import { useState } from "react"

export function VideoHeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="w-full py-8 relative z-0">
      <div className="relative w-full">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-900 to-slate-900 rounded-none overflow-hidden group">
          {/* Video Background */}
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="SAMNET Industrials Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <div className="w-full h-full bg-gradient-to-br from-blue-900/80 via-cyan-900/50 to-slate-900/80 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('/tech-company-innovation.jpg')] bg-cover bg-center opacity-40"></div>

                {/* Play Button */}
                <button onClick={() => setIsPlaying(true)} className="relative z-10 group/button">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl group-hover/button:shadow-cyan-500/50 transition-all duration-300 group-hover/button:scale-110">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </button>

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-5">
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 px-4">
                    Showcasing our successful implementations and innovations
                  </h2>
                  <p className="text-lg text-cyan-200 text-center max-w-2xl px-4">
                    Discover how we transform businesses with cutting-edge technology solutions
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
