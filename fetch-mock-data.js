import axios from 'axios'
import fs from 'fs'

const API_KEY = 'MASUKKAN_API_KEY_ANDA_DARI_FILE_.env'
const API_URL = 'https://newsapi.org/v2/top-headlines'
const categories = ['technology', 'business', 'sports']
const pageSize = 35 // (35 artikel * 3 kategori = 105 artikel)

async function fetchAndSaveMockData() {
  console.log('Memulai pengambilan data mock...')
  let allArticles = []

  try {
    for (const category of categories) {
      console.log(`Mengambil kategori: ${category}...`)

      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          category: category,
          language: 'en',
          pageSize: pageSize,
          country: 'us',
        },
      })

      const articlesWithCategory = response.data.articles.map((article) => ({
        ...article,
        category: category,
      }))

      allArticles = [...allArticles, ...articlesWithCategory]
    }

    const output = {
      articles: allArticles,
    }

    fs.writeFileSync(
      'public/mock-data.json',
      JSON.stringify(output, null, 2),
      'utf-8'
    )

    console.log(
      `\nSukses! Data mock telah disimpan di 'public/mock-data.json'.`
    )
    console.log(`Total artikel: ${allArticles.length}`)
  } catch (error) {
    console.error('\nTerjadi kesalahan:')
    if (error.response) {
      console.error('Error Data:', error.response.data)
    } else {
      console.error('Error Message:', error.message)
    }
    console.error(
      '\nPastikan API Key Anda sudah benar dan Anda terhubung ke internet.'
    )
  }
}

fetchAndSaveMockData()