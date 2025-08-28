'use client'

import { useEffect, useState } from 'react'

interface EggAnimationProps {
  stage: number // 0-7 (8단계)
  isHatching?: boolean
  className?: string
}

export default function EggAnimation({ stage, isHatching = false, className = "" }: EggAnimationProps) {
  const [currentStage, setCurrentStage] = useState(stage)
  
  useEffect(() => {
    setCurrentStage(stage)
  }, [stage])

  // 단계별 알 속성
  const getEggProperties = (stageNum: number) => {
    const baseSize = 60
    const maxSize = 120
    const sizeIncrement = (maxSize - baseSize) / 7
    
    const size = baseSize + (sizeIncrement * stageNum)
    
    // 색상 진화: 회색 → 파란색 → 보라색 → 분홍색 → 주황색
    const colors = [
      '#E5E7EB', // 회색 (stage 0)
      '#DBEAFE', // 연한 파란색 (stage 1)
      '#BFDBFE', // 파란색 (stage 2)
      '#C7D2FE', // 연한 보라색 (stage 3)
      '#DDD6FE', // 보라색 (stage 4)
      '#F3E8FF', // 연한 분홍색 (stage 5)
      '#FECACA', // 분홍색 (stage 6)
      '#FED7AA', // 주황색 (stage 7)
    ]
    
    const borderColors = [
      '#9CA3AF', // 회색 테두리
      '#3B82F6', // 파란색 테두리
      '#2563EB', // 진한 파란색 테두리
      '#5B21B6', // 보라색 테두리
      '#7C3AED', // 진한 보라색 테두리
      '#EC4899', // 분홍색 테두리
      '#F59E0B', // 주황색 테두리
      '#EA580C', // 진한 주황색 테두리
    ]

    return {
      size,
      backgroundColor: colors[stageNum] || colors[7],
      borderColor: borderColors[stageNum] || borderColors[7],
      glow: stageNum >= 5
    }
  }

  const eggProps = getEggProperties(currentStage)

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        {/* 글로우 효과 */}
        {eggProps.glow && (
          <div 
            className="absolute inset-0 rounded-full blur-lg opacity-30 animate-pulse"
            style={{
              backgroundColor: eggProps.borderColor,
              width: eggProps.size + 20,
              height: eggProps.size + 30,
              left: -10,
              top: -15
            }}
          />
        )}
        
        {/* 메인 알 */}
        <div
          className={`relative rounded-full transition-all duration-1000 ease-in-out ${
            isHatching ? 'animate-bounce' : ''
          }`}
          style={{
            width: eggProps.size,
            height: eggProps.size + 20,
            backgroundColor: eggProps.backgroundColor,
            border: `3px solid ${eggProps.borderColor}`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: isHatching ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {/* 반짝이는 하이라이트 */}
          <div 
            className="absolute top-2 left-3 w-3 h-4 bg-white opacity-40 rounded-full"
            style={{
              transform: `scale(${0.5 + (currentStage * 0.1)})`
            }}
          />
          
          {/* 스팟 패턴 (stage 3부터) */}
          {currentStage >= 3 && (
            <>
              <div 
                className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full opacity-20"
                style={{ backgroundColor: eggProps.borderColor }}
              />
              <div 
                className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full opacity-15"
                style={{ backgroundColor: eggProps.borderColor }}
              />
            </>
          )}
          
          {/* 지그재그 금이 간 효과 (stage 7 또는 부화 중) */}
          {(currentStage >= 7 || isHatching) && (
            <div className="absolute inset-0">
              {/* 메인 지그재그 금 - SVG로 자연스러운 모양 */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 120"
                style={{ opacity: 0.7 }}
              >
                {/* 주요 지그재그 금 */}
                <path
                  d="M 35 20 L 40 35 L 35 50 L 45 65 L 40 80 L 50 95"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  className={isHatching ? "animate-pulse" : ""}
                />
                
                {/* 보조 지그재그 금 */}
                <path
                  d="M 60 25 L 65 40 L 60 55"
                  stroke="#6B7280"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0.6 }}
                />
                
                {/* 작은 지그재그 금 */}
                <path
                  d="M 25 70 L 30 80 L 25 90"
                  stroke="#6B7280"
                  strokeWidth="0.8"
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0.5 }}
                />
                
                {/* 가로 지그재그 금 (부화 시에만) */}
                {isHatching && (
                  <path
                    d="M 20 60 L 35 65 L 50 60 L 65 65 L 80 60"
                    stroke="#6B7280"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ opacity: 0.8 }}
                  />
                )}
              </svg>
            </div>
          )}
          
          {/* 부화 효과 */}
          {isHatching && (
            <div className="absolute inset-0 rounded-full animate-ping">
              <div 
                className="w-full h-full rounded-full opacity-20"
                style={{
                  backgroundColor: eggProps.borderColor,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
              />
            </div>
          )}
        </div>
        
        {/* 파티클 효과 (고급 단계) */}
        {currentStage >= 6 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-70" />
            <div className="absolute top-1/4 right-0 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse opacity-60" />
            <div className="absolute bottom-1/4 left-0 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse opacity-50" />
          </div>
        )}
      </div>
    </div>
  )
}

// 단계별 설명 텍스트
export const getStageDescription = (stage: number): string => {
  const descriptions = [
    "새로운 여정의 시작...",
    "당신의 성향이 깨어나고 있습니다",
    "개성이 서서히 드러나고 있어요",
    "특별한 무언가가 자라나고 있습니다",
    "강한 에너지가 느껴집니다",
    "곧 놀라운 일이 일어날 것 같아요",
    "거의 다 왔습니다...",
    "부화 준비가 완료되었습니다!"
  ]
  
  return descriptions[stage] || descriptions[7]
}
