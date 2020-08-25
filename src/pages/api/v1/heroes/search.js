import { resolveHref } from "next/dist/next-server/lib/router/router"

export default async (req, res) => {
  const searchTerm = req.query.name
  const apiKey = process.env.API_KEY

  if (req.headers.referer.indexOf(req.headers.host) < 0) {
    res.statusCode = 403
    res.json([])
    return
  }

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

  res.statusCode = 200
  res.json(characters)
}
