'use client'

import { useState } from 'react'
import Link from 'next/link'
import EggAnimation from '@/components/EggAnimation'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          {/* 알 프리뷰 */}
          <div className="mb-6">
            <EggAnimation stage={0} className="mb-4" />
            <p className="text-sm text-gray-500 italic">
              설문을 통해 당신만의 독립운동가를 부화시켜보세요
            </p>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            성북구 독립운동가 추천 시스템
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            간단한 설문을 통해 당신의 성향을 파악하고,<br />
            성북구와 인연이 깊은 독립운동가 중에서<br />
            당신과 가장 닮은 인물을 찾아드립니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-sm text-gray-500">
            <div className="text-center">
              <div className="font-semibold">한용운</div>
              <div>시인, 승려</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">성봉진</div>
              <div>노동운동가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">김동삼</div>
              <div>무장투쟁가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">이육사</div>
              <div>저항시인</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">안재홍</div>
              <div>사회운동가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">강영준</div>
              <div>선전활동가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">윤하진</div>
              <div>의열투사</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">조소앙</div>
              <div>정치사상가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">김재황</div>
              <div>학생운동가</div>
            </div>
          </div>
          
          <Link href="/survey" className="btn-primary inline-block">
            설문 시작하기
          </Link>
        </div>
      </div>
    </div>
  )
}
