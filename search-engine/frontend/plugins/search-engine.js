
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('searchEngine', {
          async search(query) {
                const response = await app.$axios.get(`/search?query=${query}`)
                return response.data
          },
          async addWord(word) {
                const response = await app.$axios.post(`/search`, {
                        word
                })
                return response.data
          },
          async removeWord(word) {
                const response = await app.$axios.delete(`/search/${word}`)
                return response.data
          }
  })
}

