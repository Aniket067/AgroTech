


import React, { useEffect, useState } from 'react'
import { Calendar, ExternalLink, Leaf, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function CropNews() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
      if (!apiKey) {
        setError('API Key is missing. Please check your environment variables.')
        setLoading(false)
        return
      }

      const url = `https://newsapi.org/v2/everything?q=india+agriculture+crop+disease&apiKey=${apiKey}`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data.articles.slice(0, 6)) // Limit to 6 latest articles
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (date: string) => 
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const defaultImage = 'https://example.com/default-image.jpg'

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 via-neutral-50 to-emerald-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-14 text-center">
         
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Latest Crop News
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments in sustainable farming and crop management
          </p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md">
                <CardHeader className="p-0">
                  <Skeleton className="h-52 w-full" />
                </CardHeader>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center bg-red-50 border border-red-100 rounded-xl p-6 max-w-md mx-auto">
            <div className="text-red-600 mb-2 font-medium">Unable to load news</div>
            <p className="text-gray-600">Please try again later or check your connection.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div key={index} className="group">
                <Card className="overflow-hidden border-none shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-xl group-hover:translate-y-px bg-white">
                  <CardHeader className="p-0">
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={article.urlToImage || defaultImage}
                        alt={article.title || 'News article image'}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-3 right-3 bg-white text-emerald-700 hover:bg-white">
                        {article.source.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 text-sm text-emerald-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all duration-300"
                      asChild
                    >
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Read Full Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}