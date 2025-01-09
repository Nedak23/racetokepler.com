import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Race to Kepler
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Embark on an interstellar journey in this thrilling board game of space exploration
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Gameplay</h3>
              <p className="text-gray-300">
                Plan your route, manage resources, and outmaneuver opponents in your race to reach Kepler.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Space Adventure</h3>
              <p className="text-gray-300">
                Navigate through asteroid fields, solar storms, and cosmic events in this immersive experience.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Multiplayer Fun</h3>
              <p className="text-gray-300">
                Compete with friends and family in an exciting race across the galaxy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
