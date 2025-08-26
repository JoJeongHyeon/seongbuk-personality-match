'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            성북구 인물 추천 시스템
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            간단한 설문을 통해 당신의 성향을 파악하고,<br />
            성북구와 인연이 깊은 문학인 중에서<br />
            당신과 가장 닮은 인물을 찾아드립니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm text-gray-500">
            <div className="text-center">
              <div className="font-semibold">계용묵</div>
              <div>소설가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">김광균</div>
              <div>시인</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">박경리</div>
              <div>소설가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">조지훈</div>
              <div>시인</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">김환기</div>
              <div>화가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">박완서</div>
              <div>소설가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">최인훈</div>
              <div>소설가</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">박목월</div>
              <div>시인</div>
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
