"use client"

import { useRef, useEffect, useState } from "react"

interface Partner {
  id: string
  name: string
  logo: string
}

const partners: Partner[] = [
  {
    id: "1",
    name: "Microsoft",
    logo: "/microsoft-logo.jpg",
  },
  {
    id: "2",
    name: "Google Cloud",
    logo: "/google-cloud-logo.jpg",
  },
  {
    id: "3",
    name: "AWS",
    logo: "/amazon-aws-logo.jpg",
  },
  {
    id: "4",
    name: "IBM",
    logo: "/ibm-logo.jpg",
  },
  {
    id: "5",
    name: "Oracle",
    logo: "/oracle-logo.jpg",
  },
  {
    id: "6",
    name: "Cisco",
    logo: "/cisco-logo.jpg",
  },
  {
    id: "7",
    name: "Intel",
    logo: "/intel-logo.jpg",
  },
  {
    id: "8",
    name: "NVIDIA",
    logo: "/nvidia-logo.jpg",
  },
]

export function PartnersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return

    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 2
        if (
          scrollContainerRef.current.scrollLeft >=
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
        ) {
          scrollContainerRef.current.scrollLeft = 0
        }
      }
    }, 30)

    return () => clearInterval(scrollInterval)
  }, [autoScroll])

  return (
    <section className="py-8 relative z-0">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <p className="text-lg text-cyan-300 font-medium">Trusted by industry leaders worldwide</p>
        </div>

        <div className="mt-6">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex-shrink-0 w-48 h-24 bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-500/30 rounded-lg flex items-center justify-center p-4 hover:border-cyan-400/50 hover:bg-blue-900/60 transition-all duration-300 group"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
