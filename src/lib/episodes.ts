import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string, optional } from 'valibot'

export interface Episode {
  id: string
  title: string
  published: Date
  description: string
  content?: string
  audio: {
    src: string
    type: string
    length?: number
  }
  duration?: string
  image?: string
  season?: number
  episode?: number
  episodeType?: string
  link?: string
  author?: string
  explicit?: string
  summary?: string
}

export async function getAllEpisodes() {
  let FeedSchema = object({
    items: array(
      object({
        id: string(), // Changed from number() to string()
        title: string(),
        published: number(),
        description: string(),
        content: optional(string()),
        enclosures: array(
          object({
            url: string(),
            type: string(),
            length: optional(string()), // 'length' is a string in the feed
          }),
        ),
        itunes_duration: optional(string()),
        itunes_image: optional(
          object({
            href: string(),
          }),
        ),
        itunes_season: optional(number()),
        itunes_episode: optional(number()),
        itunes_episodeType: optional(string()),
        link: optional(string()),
        author: optional(string()),
        itunes_explicit: optional(string()),
        itunes_summary: optional(string()),
      }),
    ),
  })

  let feed = (await parseFeed(
    'https://anchor.fm/s/fc9cfc28/podcast/rss',
  )) as unknown

  // Parse the feed using the updated schema
  let { items } = parse(FeedSchema, feed)

  let episodes: Array<Episode> = items.map(
    ({
      id,
      title,
      description,
      content,
      enclosures,
      published,
      itunes_duration,
      itunes_image,
      itunes_season,
      itunes_episode,
      itunes_episodeType,
      link,
      author,
      itunes_explicit,
      itunes_summary,
    }) => ({
      id,
      title,
      published: new Date(published),
      description,
      content: content || itunes_summary, // Use 'itunes_summary' if 'content' is missing
      audio: {
        src: enclosures[0]?.url,
        type: enclosures[0]?.type,
        length: enclosures[0]?.length
          ? Number(enclosures[0].length)
          : undefined,
      },
      duration: itunes_duration,
      image: itunes_image?.href,
      season: itunes_season,
      episode: itunes_episode,
      episodeType: itunes_episodeType,
      link,
      author,
      explicit: itunes_explicit,
      summary: itunes_summary,
    }),
  )

  return episodes
}
