import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - The NextGen Insights Podcast',
    default:
      'The NextGen Insights - Explore how today’s tech trends will shape tomorrow’s world, all in bite-sized, easy-to-digest insights. ',
  },
  description:
    'Explore how today’s tech trends will shape tomorrow’s world, all in bite-sized, easy-to-digest insights. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </head>
      <body className="flex min-h-full">
        <div className="w-full">{children}</div>
      </body>
    </html>
  )
}
