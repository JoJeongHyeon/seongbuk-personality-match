import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '성북구 인물 추천 시스템',
  description: '당신과 닮은 성북구의 문학인을 찾아보세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
}
