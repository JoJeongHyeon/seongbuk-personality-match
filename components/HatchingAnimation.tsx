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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="text-center max-w-2xl w-full mx-auto">
        
        {/* 격려 메시지 입력 단계 */}
        {phase === 'input' && (
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xl mx-auto">
            <div className="mb-8">
              <EggAnimation 
                stage={7} 
                isHatching={false}
                className="transform scale-125 mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                🥚 곧 부화할 알에게
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                독립운동가의 정신을 담은<br />
                따뜻한 격려의 말을 건네주세요
              </p>
            </div>
            
            <div className="space-y-6">
              <textarea
                value={encouragement}
                onChange={(e) => setEncouragement(e.target.value)}
                placeholder="예: 우리나라를 위해 힘을 내주세요! 당신의 숭고한 뜻을 이어가겠습니다..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-primary-500 focus:outline-none text-base leading-relaxed"
                maxLength={120}
              />
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  💡 독립운동가의 숭고한 정신에 어울리는 메시지를 작성해보세요
                </div>
                <div className="text-gray-400">
                  {encouragement.length}/120
                </div>
              </div>
              
              <button
                onClick={handleEncouragementSubmit}
                disabled={!encouragement.trim()}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  encouragement.trim() 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
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
