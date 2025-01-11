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
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
        <div className="stars absolute inset-0 opacity-20"></div>
      </div>
      
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center max-w-2xl mx-auto">            
            <h1 className="text-6xl font-bold text-white mb-4">
              Race to Kepler
            </h1>
            
            {/* Signup Form */}
            <div className="mb-16">
              <p className="text-xl text-gray-200 mb-6">
                Enter your email for a free printable copy
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    className="flex-1 px-4 py-2 bg-black/40 border border-emerald-900/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    placeholder="astronaut@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg ${
                      status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {status === 'loading' ? 'Sending...' : 'Get Copy'}
                  </button>
                </div>
                {message && (
                  <div className={`p-3 rounded-lg text-center text-sm ${
                    status === 'success' ? 'bg-emerald-900/50 text-emerald-200' : 'bg-red-900/50 text-red-200'
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>

            <p className="text-xl text-gray-200 mb-8">
              Embark on an interstellar journey in this thrilling board game of space exploration
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-emerald-900/30">
              <div className="mb-4 text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Strategic</h3>
              <p className="text-gray-300">
                Four different unique classes of cards, each with their own unique strategies. Mix and match to create the perfect crew.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-emerald-900/30">
              <div className="mb-4 text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive</h3>
              <p className="text-gray-300">
                Fight over powerful Titan cards through intense bidding. Making each round a balance between improving your crew and outbidding your opponents.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-emerald-900/30">
              <div className="mb-4 text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Replayable</h3>
              <p className="text-gray-300">
                Each game select one of twenty unique city-states to play as, each with their own unique passive and active abilities. 
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
