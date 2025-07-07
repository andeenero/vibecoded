'use client'

import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'

// Your oracle deck cards
const cards = [
  {
    id: 1,
    title: "DIGITAL DETOX",
    message: "Delete your social media accounts for 24 hours and touch some grass."
  },
  {
    id: 2,
    title: "BHAG",
    subtitle: "(Big Hairy Audacious Goal)",
    message: "Pick a goal that seems impossible for you to achieve. Ask ChatGPT to reverse engineer it happening for you. Gain the confidence of knowing you can achieve anything."
  },
  {
    id: 3,
    title: "5 YEAR PLAN",
    message: "Write down your vision for your ideal future life in 5 years. Then pick one thing you are doing in that vision and start doing it today."
  }
]

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [hasDrawnToday, setHasDrawnToday] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  const handleFlip = () => {
    if (!hasDrawnToday) {
      // Pick a random card when first flipping
      const randomIndex = Math.floor(Math.random() * cards.length)
      setCurrentCard(randomIndex)
      setHasDrawnToday(true)
    }
    setIsFlipped(!isFlipped)
  }

  const handleNewCard = () => {
    setIsFlipped(false)
    setHasDrawnToday(false)
    // Reset after animation
    setTimeout(() => {
      setCurrentCard(0)
    }, 300)
  }

  const handleShare = async () => {
    if (shareCardRef.current === null) {
      return
    }

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `vibecoded-${card.title.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error generating image:', err)
    }
  }

  const card = cards[currentCard]

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#d5ae76' }}>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-widest" style={{ color: '#4a1b10', fontFamily: 'Playfair Display, serif' }}>
          VIBECODED.
        </h1>
        
        {/* Card Container */}
        <div className="relative w-72 sm:w-80 h-[400px] sm:h-[450px] mx-auto">
          <div 
            className={`absolute inset-0 w-full h-full transition-all duration-700 transform-gpu preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Front */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl flex items-center justify-center"
              style={{ 
                backfaceVisibility: 'hidden',
                backgroundColor: '#4a1b10'
              }}
            >
              <div className="text-center p-6 sm:p-8" style={{ color: '#d5ae76' }}>
                <p className="text-6xl sm:text-7xl mb-4 sm:mb-6" style={{ fontFamily: 'Ballet, cursive' }}>✦</p>
                <p className="text-xl sm:text-2xl font-light tracking-wide" style={{ fontFamily: 'Montaga, serif' }}>
                  Tap for today&apos;s
                </p>
                <p className="text-2xl sm:text-3xl tracking-wide" style={{ fontFamily: 'Montaga, serif' }}>
                  download
                </p>
              </div>
            </div>

            {/* Card Back */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl flex flex-col justify-between p-6 sm:p-8 rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: '#d5ae76',
                border: '2px solid #4a1b10'
              }}
            >
              <div className="text-center">
                <p className="text-6xl mb-4" style={{ fontFamily: 'Ballet, cursive', color: '#4a1b10' }}>
                  {String(card.id).padStart(2, '0')}
                </p>
                <h2 className="text-2xl mb-2 tracking-wider" style={{ fontFamily: 'Playfair Display, serif', color: '#4a1b10' }}>
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="text-sm mb-4" style={{ fontFamily: 'Montaga, serif', color: '#4a1b10', opacity: 0.8 }}>
                    {card.subtitle}
                  </p>
                )}
              </div>
              
              <div className="text-center px-4">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Montaga, serif', color: '#4a1b10' }}>
                  {card.message}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm tracking-widest" style={{ fontFamily: 'Playfair Display, serif', color: '#4a1b10' }}>
                  VIBECODED
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm tracking-wide" style={{ color: '#4a1b10', fontFamily: 'Montaga, serif', opacity: 0.7 }}>
            A daily practice in digital minimalism
          </p>
          
          {isFlipped && (
            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="block mx-auto px-6 py-2 rounded-full transition-all hover:opacity-80"
                style={{ 
                  backgroundColor: '#4a1b10',
                  color: '#d5ae76',
                  fontFamily: 'Montaga, serif'
                }}
              >
                Share this wisdom
              </button>
              
              <button
                onClick={handleNewCard}
                className="block mx-auto text-sm underline transition-opacity hover:opacity-70"
                style={{ color: '#4a1b10', fontFamily: 'Montaga, serif' }}
              >
                Draw another card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Instagram Story Card for sharing */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div 
          ref={shareCardRef}
          style={{
            width: '1080px',
            height: '1920px',
            backgroundColor: '#d5ae76',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '120px 80px',
          }}
        >
          {/* Top */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '72px',
              color: '#4a1b10',
              letterSpacing: '0.2em',
              marginBottom: '60px'
            }}>
              VIBECODED.
            </h1>
          </div>

          {/* Middle - Card Content */}
          <div style={{
            backgroundColor: '#4a1b10',
            borderRadius: '24px',
            padding: '80px 60px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <p style={{
              fontFamily: 'Ballet, cursive',
              fontSize: '180px',
              color: '#d5ae76',
              marginBottom: '40px'
            }}>
              {String(card.id).padStart(2, '0')}
            </p>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '56px',
              color: '#d5ae76',
              letterSpacing: '0.1em',
              marginBottom: card.subtitle ? '16px' : '60px'
            }}>
              {card.title}
            </h2>
            
            {card.subtitle && (
              <p style={{
                fontFamily: 'Montaga, serif',
                fontSize: '32px',
                color: '#d5ae76',
                opacity: 0.8,
                marginBottom: '60px'
              }}>
                {card.subtitle}
              </p>
            )}
            
            <p style={{
              fontFamily: 'Montaga, serif',
              fontSize: '36px',
              color: '#d5ae76',
              lineHeight: '1.6'
            }}>
              {card.message}
            </p>
          </div>

          {/* Bottom */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Montaga, serif',
              fontSize: '32px',
              color: '#4a1b10',
              opacity: 0.7
            }}>
              vibecoded.vercel.app
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}