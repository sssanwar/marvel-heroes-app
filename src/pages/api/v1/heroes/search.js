export default async (req, res) => {
  const searchTerm = req.query.name
  console.log("searchTerm: " + searchTerm)
  const apiKey = "9d880d4e2a647266958fced6478ec43f"
  var fetchRes = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&apikey=${apiKey}`,
    {
      method: "GET",
      headers: {
        Referer: "developer.marvel.com"
      }
    }
  )
  const resJson = await fetchRes.json()
  const characters = resJson.data.results
    .filter(r => r.description) // Get only those with description
    .map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      thumbnail: `${r.thumbnail.path}.${r.thumbnail.extension}`,
      urls: r.urls
    }))

  console.log(`Number of characters found: ` + characters.length)
  res.statusCode = 200
  res.json(characters)
}
