import { useState } from 'react'

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ keyword, fromDate, toDate })
  }

  const handleReset = () => {
    setKeyword('')
    setFromDate('')
    setToDate('')
    onSearch({ keyword: '', fromDate: '', toDate: '' })
  }

  return (
    <div className="bg-white rounded-lg border border-secondary-200 p-6 sticky top-24">
      <h2 className="text-lg font-display font-semibold text-secondary-900 mb-4 flex items-center">
        <i className="fas fa-search mr-2 text-primary-600"></i>
        Search Articles
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-secondary-700 mb-2">
            Keyword <span className="text-primary-600">*</span>
          </label>
          <div className="relative">
            <i className="fas fa-keyboard absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search keyword..."
              required
              minLength="3"
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-secondary-500 mt-1">Min. 3 characters</p>
        </div>

        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-secondary-700 mb-2">
            From Date
          </label>
          <div className="relative">
            <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              max={toDate || new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-secondary-700 mb-2">
            To Date
          </label>
          <div className="relative">
            <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="submit"
            className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg hover:bg-primary-700 transition font-medium flex items-center justify-center text-sm"
          >
            <i className="fas fa-search mr-2"></i>
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full px-4 py-2.5 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition font-medium text-sm"
          >
            <i className="fas fa-redo mr-2"></i>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm