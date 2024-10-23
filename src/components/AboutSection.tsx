'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-primary-300', 'fill-primary-500']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
        The NextGen Insights explores the latest breakthroughs in technology and
        AI, diving into cutting-edge research and studies that shape the future.
        Each episode unpacks complex concepts and innovations in artificial
        intelligence, robotics, quantum computing, and more—breaking them down
        into simple, engaging insights. Whether you&apos;re a tech enthusiast or an
        industry professional, join us twice a week to stay ahead of the curve
        in the fast-evolving world of technology. This podcast is created using
        AI tools, and the voices are AI-generated.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-primary hover:text-secondary active:text-indigo-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
