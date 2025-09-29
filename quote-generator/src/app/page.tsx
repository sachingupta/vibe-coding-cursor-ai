'use client'

import { useState, useEffect } from 'react'

interface Quote {
  text: string
  author: string
}

interface UnsplashImage {
  urls: {
    regular: string
    full: string
  }
  alt_description: string
  user: {
    name: string
  }
}

const fallbackQuotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown"
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs"
  },
  {
    text: "Experience is the teacher of all things.",
    author: "Julius Caesar"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  }
]

export default function Home() {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [imageLoading, setImageLoading] = useState<boolean>(false)

  const fetchQuoteFromAPI = async (): Promise<Quote | null> => {
    try {
      const response = await fetch('https://type.fit/api/quotes')
      if (!response.ok) throw new Error('API request failed')
      
      const quotes = await response.json()
      if (!quotes || quotes.length === 0) throw new Error('No quotes received')
      
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const randomQuote = quotes[randomIndex]
      
      return {
        text: randomQuote.text || 'No quote text available',
        author: randomQuote.author?.replace(', type.fit', '') || 'Unknown'
      }
    } catch (error) {
      console.error('Error fetching quote from API:', error)
      return null
    }
  }

  const getFallbackQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length)
    return fallbackQuotes[randomIndex]
  }

  const fetchBackgroundImage = async (): Promise<string | null> => {
    try {
      // Scenic keywords for beautiful backgrounds
      const keywords = ['landscape', 'nature', 'mountains', 'ocean', 'forest', 'sunset', 'sunrise', 'sky', 'scenery', 'peaceful']
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]
      
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${randomKeyword}&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      )
      
      if (!response.ok) throw new Error('Unsplash API request failed')
      
      const data: UnsplashImage = await response.json()
      return data.urls.regular
    } catch (error) {
      console.error('Error fetching background image:', error)
      return null
    }
  }

  const fetchNewQuote = async () => {
    setLoading(true)
    setImageLoading(true)
    setError('')

    // Fetch both quote and background image in parallel
    const [apiQuote, newBackgroundImage] = await Promise.all([
      fetchQuoteFromAPI(),
      fetchBackgroundImage()
    ])
    
    // Set quote
    if (apiQuote) {
      setQuote(apiQuote)
    } else {
      // Fall back to local quotes if API fails
      setQuote(getFallbackQuote())
      setError('Using offline quotes (API unavailable)')
    }

    // Set background image
    if (newBackgroundImage) {
      setBackgroundImage(newBackgroundImage)
    }

    setLoading(false)
    setImageLoading(false)
  }

  useEffect(() => {
    fetchNewQuote()
  }, [])

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Scenic background"
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: imageLoading ? 0.3 : 1 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}
      
      {/* Fallback gradient background */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Daily Inspiration
            </h1>
            <p className="text-gray-500 text-sm">
              Discover wisdom that motivates and inspires
            </p>
          </div>

          {/* Quote Display */}
          <div className="text-center mb-8">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ) : (
              <>
                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
                  <span className="text-4xl text-blue-400 leading-none">"</span>
                  {quote.text}
                  <span className="text-4xl text-blue-400 leading-none">"</span>
                </blockquote>
                <cite className="text-lg text-gray-600 font-semibold">
                  — {quote.author}
                </cite>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center mb-6">
              <p className="text-amber-600 text-sm bg-amber-50 px-4 py-2 rounded-lg inline-block">
                {error}
              </p>
            </div>
          )}

          {/* New Quote Button */}
          <div className="text-center">
            <button
              onClick={fetchNewQuote}
              disabled={loading || imageLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading || imageLoading ? 'Loading...' : 'New Quote & Image'}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-400 text-sm">
              Powered by inspiration • Images from Unsplash • Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

