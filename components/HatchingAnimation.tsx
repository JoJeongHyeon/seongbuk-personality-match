'use client'

import { useEffect, useState } from 'react'
import EggAnimation from './EggAnimation'

interface HatchingAnimationProps {
  onHatchingComplete: (encouragement?: string) => void
  figureName: string
}

export default function HatchingAnimation({ onHatchingComplete, figureName }: HatchingAnimationProps) {
  const [phase, setPhase] = useState<'input' | 'cracking' | 'hatching' | 'complete'>('input')
  const [encouragement, setEncouragement] = useState('')
  
  const handleEncouragementSubmit = () => {
    if (encouragement.trim()) {
      setPhase('cracking')
      
      const timer1 = setTimeout(() => {
        setPhase('hatching')
      }, 1500)
      
      const timer2 = setTimeout(() => {
        setPhase('complete')
        onHatchingComplete(encouragement.trim())
      }, 3500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }

  if (phase === 'complete') {
    return null // 부화 완료 후 숨김
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto p-6">
        
        {/* 격려 메시지 입력 단계 */}
        {phase === 'input' && (
          <div className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="mb-6">
              <EggAnimation 
                stage={7} 
                isHatching={false}
                className="transform scale-125 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🥚 곧 부화할 알에게
              </h3>
              <p className="text-gray-600 text-sm">
                따뜻한 격려의 말을 건네주세요
              </p>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={encouragement}
                onChange={(e) => setEncouragement(e.target.value)}
                placeholder="예: 건강하게 태어나렴! 너의 모습이 궁금해..."
                className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-primary-500 focus:outline-none text-sm"
                maxLength={100}
              />
              <div className="text-xs text-gray-400 text-right">
                {encouragement.length}/100
              </div>
              
              <button
                onClick={handleEncouragementSubmit}
                disabled={!encouragement.trim()}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  encouragement.trim() 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                🎉 부화시키기
              </button>
            </div>
          </div>
        )}

        {/* 부화 진행 단계 */}
        {(phase === 'cracking' || phase === 'hatching') && (
          <>
            {/* 부화 중인 알 */}
            <div className="relative mb-6">
              <EggAnimation 
                stage={7} 
                isHatching={phase === 'hatching'}
                className="transform scale-150"
              />
              
              {/* 부화 효과 */}
              {phase === 'hatching' && (
                <>
                  {/* 빛나는 효과 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-ping" />
                  </div>
                  
                  {/* 파티클 효과 */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-70"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${0.8 + Math.random() * 0.4}s`
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* 메시지 */}
            <div className="text-white">
              {phase === 'cracking' && (
                <div className="space-y-2">
                  <p className="text-lg animate-pulse">
                    당신의 마음이 전해지고 있습니다...
                  </p>
                  <p className="text-sm text-gray-300 italic">
                    "{encouragement}"
                  </p>
                </div>
              )}
              {phase === 'hatching' && (
                <div className="space-y-2">
                  <p className="text-xl font-semibold animate-bounce">
                    🎉 부화 완료! 🎉
                  </p>
                  <p className="text-lg">
                    당신의 격려를 받고 <strong>{figureName}</strong>가 나타났습니다!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
