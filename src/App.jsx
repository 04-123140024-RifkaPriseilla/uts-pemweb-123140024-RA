import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import DataTable from './components/DataTable'

function App() {
  const [allArticles, setAllArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState({
    category: 'technology',
    keyword: '',
    fromDate: '',
    toDate: '',
  })

  const pageSize = 9

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/mock-data.json')
        if (!response.ok) {
          throw new Error('Failed to load mock data')
        }
        const data = await response.json()
        setAllArticles(data.articles || [])
      } catch (err) {
        setError(err.message || 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    setLoading(true)
    let filteredArticles = [...allArticles]

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title?.toLowerCase().includes(keyword) ||
          article.description?.toLowerCase().includes(keyword)
      )
    } else {
      filteredArticles = filteredArticles.filter(
        (article) => article.category === filters.category
      )
    }

    if (filters.fromDate) {
      filteredArticles = filteredArticles.filter(
        (article) => new Date(article.publishedAt) >= new Date(filters.fromDate)
      )
    }

    if (filters.toDate) {
      filteredArticles = filteredArticles.filter(
        (article) => new Date(article.publishedAt) <= new Date(filters.toDate)
      )
    }

    setTotalResults(filteredArticles.length)

    const startIndex = (currentPage - 1) * pageSize
    const paginatedArticles = filteredArticles.slice(
      startIndex,
      startIndex + pageSize
    )

    setArticles(paginatedArticles)
    setLoading(false)
  }, [filters, currentPage, allArticles])

  const handleSearch = (searchParams) => {
    setFilters((prev) => ({ ...prev, ...searchParams }))
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
      keyword: '',
      fromDate: '',
      toDate: '',
    }))
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header
        currentCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <SearchForm onSearch={handleSearch} />
          </aside>

          <div className="lg:col-span-3">
            {error && (
              <div className="bg-primary-50 border border-primary-200 text-primary-700 px-4 py-3 rounded-lg mb-6">
                <p className="flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin text-4xl text-primary-600 mb-4"></i>
                  <p className="text-secondary-600">Loading news...</p>
                </div>
              </div>
            ) : (
              <>
                <DataTable articles={articles} />

                {totalResults > pageSize && (
                  <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>

                    {[
                      ...Array(
                        Math.min(Math.ceil(totalResults / pageSize), 5)
                      ),
                    ].map((_, idx) => {
                      const pageNum = idx + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg transition ${
                            currentPage === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage >= Math.ceil(totalResults / pageSize)
                      }
                      className="px-4 py-2 bg-white border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App