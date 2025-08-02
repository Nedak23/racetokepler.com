'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }
      
      setStatus('success')
      setMessage('Thank you for signing up! Check your email for your printable game copy.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/Background.png"
          alt="A mystical space scene with a floating city and orange sun"
          fill
          className="object-cover blur-sm"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50"></div>
        <div className="stars absolute inset-0 opacity-20"></div>
      </div>
      
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-20">
          <div className="text-center max-w-2xl mx-auto">            
            <h1 className="text-6xl font-bold text-white mb-2">
              Race to Kepler
            </h1>
            <p className="text-2xl text-gray-300 mb-4">A Spacefaring Deckbuilding Game</p>
            <p className="text-lg text-golden-400 mb-4">Coming in 2025</p>
            <div className="flex justify-center gap-8 text-gray-300 text-sm mb-8">
              <span>2-4 Players</span>
              <span>45-60 Minutes</span>
              <span>Ages 10+</span>
            </div>

            {/* Signup Form */}
            <div className="mb-12">
              <p className="text-xl text-gray-200 mb-6">
                Enter your email for a free printable copy
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    className="flex-1 px-4 py-2 bg-black/40 border border-teal-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                    placeholder="astronaut@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`bg-coral-600 hover:bg-coral-500 text-white font-bold py-2 px-6 rounded-lg ${
                      status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {status === 'loading' ? 'Sending...' : 'Get Copy'}
                  </button>
                </div>
                {message && (
                  <div className={`p-3 rounded-lg text-center text-sm ${
                    status === 'success' ? 'bg-teal-900/50 text-teal-200' : 'bg-coral-900/50 text-coral-200'
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>

            {/* How to Play Video */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">How to Play</h2>
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/hBYRWf-QaTs"
                    title="Race to Kepler - How to Play"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Box Art */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                <Image
                  src="/images/BoxArt.png"
                  alt="Race to Kepler box art showing spaceships racing toward a bright light against a red cosmic background"
                  width={400}
                  height={500}
                  priority
                />
              </div>
            </div>

            {/* Separator */}
            <div className="flex justify-center items-center gap-4 text-golden-400/60 mb-12">
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span className="w-3 h-3 rounded-full bg-current"></span>
              <span className="w-2 h-2 rounded-full bg-current"></span>
            </div>

            {/* Card Sample Image */}
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/images/CardSample.png"
                alt="Sample of Race to Kepler cards showing different card types"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 text-golden-400/60 py-4">
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span className="w-3 h-3 rounded-full bg-current"></span>
          <span className="w-2 h-2 rounded-full bg-current"></span>
        </div>

        {/* Premise Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">The Premise</h2>
            <p className="text-xl text-gray-200 mb-6">
              The 20 most populous world cities have launched into the cosmos, each racing to claim humanity&apos;s new home: Kepler-452b.
            </p>
            <p className="text-xl text-gray-200 mb-6">
              Rising temperatures have rendered our planet unlivable, but humanity always finds a way. In the twilight of Earth&apos;s habitability, this is humanities greatest challenge yet.
            </p>
            <p className="text-xl text-gray-200">
              In Race to Kepler, you&apos;ll lead one of these ambitious city-states in a high-stakes interstellar competition. Recruit elite crew members, bid for powerful Titans, and generate the energy needed to power your ship. Your mission: be the first to reach and colonize our species&apos; last hope for survival.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 text-golden-400/60 py-4">
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span className="w-3 h-3 rounded-full bg-current"></span>
          <span className="w-2 h-2 rounded-full bg-current"></span>
        </div>

        {/* Design Goals Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Design Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-teal-700/30">
              <div className="mb-4 text-golden-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy to Learn</h3>
              <p className="text-gray-300">
                Beginners can mono-type to one color coded class, but advanced players take advantage of powerful cross-class building combos.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-teal-700/30">
              <div className="mb-4 text-coral-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive</h3>
              <p className="text-gray-300">
                Bid for Titan cards, which increases player interaction & reduces the randomness of trade row buying.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-teal-700/30">
              <div className="mb-4 text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Highly Replayable</h3>
              <p className="text-gray-300">
                Create variance from game to game by choosing between one of twenty different City cards, each with unique passive and active abilities.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 text-golden-400/60 py-4">
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span className="w-3 h-3 rounded-full bg-current"></span>
          <span className="w-2 h-2 rounded-full bg-current"></span>
        </div>

        {/* Components Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Components</h2>
            <ul className="text-xl text-gray-200 space-y-3">
              <li>88 Crew Cards (20 Titan Cards)</li>
              <li>20 City Cards</li>
              <li>25 Energy Cubes</li>
              <li>4 Parsec Trackers</li>
              <li>1 First Player Marker</li>
              <li>1 Game Board</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
