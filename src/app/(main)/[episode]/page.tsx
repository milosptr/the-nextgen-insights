import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes } from '@/lib/episodes'

const getEpisode = cache(async (id: string) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id.toString() === id)

  if (!episode) {
    notFound()
  }

  return episode
})

export async function generateMetadata({
  params,
}: {
  params: { episode: string }
}) {
  let episode = await getEpisode(params.episode)

  return {
    title: episode.title,
  }
}

export default async function Episode({
  params,
}: {
  params: { episode: string }
}) {
  let episode = await getEpisode(params.episode)
  let date = new Date(episode.published)

  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex items-center gap-6">
            <EpisodePlayButton
              episode={episode}
              className="group relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-full bg-primary hover:bg-primary-800 focus:outline-none focus:ring focus:ring-primary focus:ring-offset-4"
              playing={
                <PauseIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
              }
              paused={
                <PlayIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
              }
            />
            <div className="flex flex-col">
              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {episode.title}
              </h1>
              <FormattedDate
                date={date}
                className="order-first font-mono text-sm leading-7 text-slate-500"
              />
            </div>
          </div>
          <div
            className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <div className="pl-24">
            <img
              src={episode.image!}
              alt={episode.title}
              className="my-4 aspect-square w-full flex-shrink-0 rounded-lg"
            />
          </div>
        </header>
      </Container>
    </article>
  )
}
