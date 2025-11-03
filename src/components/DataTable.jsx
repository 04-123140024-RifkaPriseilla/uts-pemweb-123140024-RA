function DataTable({ articles }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-secondary-200 p-12 text-center">
        <i className="fas fa-inbox text-6xl text-secondary-300 mb-4"></i>
        <p className="text-secondary-600 text-lg">No articles found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <article
          key={index}
          className="bg-white rounded-lg border border-secondary-200 overflow-hidden"
        >
          <div className="relative pb-[56.25%] bg-secondary-200">
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-image text-4xl text-secondary-400"></i>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                <i className="fas fa-building mr-1"></i>
                {article.source.name}
              </span>
              <span className="text-xs text-secondary-500">
                <i className="fas fa-clock mr-1"></i>
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-sm text-secondary-600 line-clamp-3 mb-4">
              {article.description || 'No description available'}
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              Read more
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default DataTable