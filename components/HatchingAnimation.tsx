'use client'

import { useEffect, useState } from 'react'
import EggAnimation from './EggAnimation'

interface HatchingAnimationProps {
  onHatchingComplete: () => void
  figureName: string
}

export default function HatchingAnimation({ onHatchingComplete, figureName }: HatchingAnimationProps) {
  const [phase, setPhase] = useState<'cracking' | 'hatching' | 'complete'>('cracking')
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('hatching')
    }, 1500)
    
    const timer2 = setTimeout(() => {
      setPhase('complete')
      onHatchingComplete()
    }, 3500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onHatchingComplete])

  if (phase === 'complete') {
    return null // 부화 완료 후 숨김
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* 부화 중인 알 */}
        <div className="relative mb-6">
          <EggAnimation 
            stage={7} 
            isHatching={true}
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
            <p className="text-lg animate-pulse">
              알이 부화하고 있습니다...
            </p>
          )}
          {phase === 'hatching' && (
            <div className="space-y-2">
              <p className="text-xl font-semibold animate-bounce">
                🎉 부화 완료! 🎉
              </p>
              <p className="text-lg">
                당신과 닮은 독립운동가 <strong>{figureName}</strong>가 나타났습니다!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
