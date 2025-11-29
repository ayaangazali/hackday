'use client'

import Link from 'next/link'

export default function HomeLink() {
  return (
    <Link 
      href="/" 
      className="flex items-center"
    >
      <span className="text-2xl font-bold text-white tracking-wider hover:text-gray-300 transition-colors">
        iSPY
      </span>
    </Link>
  )
}
