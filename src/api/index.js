const cache = new Map()

export const searchCharacters = async searchTerm => {
  const cachedResult = cache.get(searchTerm)
  if (cachedResult) return Promise.resolve(cachedResult)

  const result = fetch(`/api/v1/heroes/search?name=${searchTerm}`)
  const resultJson = (await result).json()
  cache.set(searchTerm, resultJson)
  return resultJson
}
