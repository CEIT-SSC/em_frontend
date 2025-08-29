import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AUT GameCraft 2024',
  description: 'AUT GameCraft Competition Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
