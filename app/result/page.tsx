'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { findBestMatch, getTopTraits, type TraitScores, type MatchResult } from '@/lib/matching'

export default function Result() {
  const searchParams = useSearchParams()
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [explanation, setExplanation] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [userTopTraits, setUserTopTraits] = useState<Array<{ name: string, score: number }>>([])

  useEffect(() => {
    const scoresParam = searchParams.get('scores')
    if (scoresParam) {
      try {
        const userTraits: TraitScores = JSON.parse(decodeURIComponent(scoresParam))
        const result = findBestMatch(userTraits)
        const topTraits = getTopTraits(userTraits)
        
        setMatchResult(result)
        setUserTopTraits(topTraits)
        
        // GPT API 호출하여 설명 생성
        generateExplanation(result, userTraits)
      } catch (error) {
        console.error('Error parsing scores:', error)
        setIsLoading(false)
      }
    }
  }, [searchParams])

  const generateExplanation = async (result: MatchResult, userTraits: TraitScores) => {
    try {
      const response = await fetch('/api/generate-explanation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          figureName: result.figure.name,
          userTraits,
          figureTraits: result.figure.personality_traits,
          matchingTraits: result.matchingTraits,
          figureDescription: result.figure.description,
          themes: result.figure.themes
        })
      })

      const data = await response.json()
      setExplanation(data.explanation)
    } catch (error) {
      console.error('Error generating explanation:', error)
      setExplanation('설명을 생성하는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (!matchResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">결과를 불러올 수 없습니다.</p>
          <Link href="/" className="btn-primary">
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">분석 결과</h1>
          <p className="text-gray-600">당신과 가장 닮은 성북구의 문학인을 찾았습니다!</p>
        </div>

        {/* Main Result Card */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {matchResult.figure.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {matchResult.figure.name}
            </h2>
            <p className="text-xl text-gray-600 mb-1">
              {matchResult.figure.occupation} ({matchResult.figure.birth_year}~{matchResult.figure.death_year})
            </p>
            <p className="text-primary-600 font-medium">
              유사도: {matchResult.similarity.toFixed(1)}%
            </p>
          </div>

          {/* AI Generated Explanation */}
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 AI 분석 결과
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {explanation || '설명을 생성하는 중입니다...'}
            </p>
          </div>

          {/* Figure Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📚 인물 소개
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {matchResult.figure.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>성북구 연관:</strong> {matchResult.figure.seongbuk_connection}
            </p>
          </div>

          {/* Major Works */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✨ 주요 작품
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchResult.figure.major_works.map((work, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {work}
                </span>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎨 주요 테마
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchResult.figure.themes.map((theme, index) => (
                <span 
                  key={index}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* User Traits Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🔍 당신의 주요 특성
            </h3>
            <div className="space-y-3">
              {userTopTraits.map((trait, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{trait.name}</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-primary-600 rounded-full"
                        style={{ width: `${Math.max(10, (trait.score + 10) * 5)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {trait.score > 0 ? '+' : ''}{trait.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🤝 공통 특성
            </h3>
            <div className="space-y-2">
              {matchResult.matchingTraits.length > 0 ? (
                matchResult.matchingTraits.map((trait, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{trait}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">공통 특성을 분석 중입니다...</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Link href="/survey" className="btn-secondary">
            다시 테스트하기
          </Link>
          <Link href="/" className="btn-primary">
            처음으로
          </Link>
        </div>
      </div>
    </div>
  )
}




