'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import surveyQuestions from '@/data/survey-questions.json'

interface SurveyAnswer {
  questionId: string
  selectedOption: number
}

interface TraitScores {
  [key: string]: number
}

export default function Survey() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswer: SurveyAnswer = {
      questionId: surveyQuestions[currentQuestion].id,
      selectedOption
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
    } else {
      // 설문 완료 - 결과 계산 후 결과 페이지로 이동
      const traitScores = calculateTraitScores(updatedAnswers)
      const encodedResults = encodeURIComponent(JSON.stringify(traitScores))
      router.push(`/result?scores=${encodedResults}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1]?.selectedOption ?? null)
      setAnswers(answers.slice(0, -1))
    }
  }

  const calculateTraitScores = (allAnswers: SurveyAnswer[]): TraitScores => {
    const scores: TraitScores = {
      introspective: 0,
      romantic: 0,
      melancholic: 0,
      intellectual: 0,
      traditional: 0,
      rebellious: 0,
      artistic: 0,
      social: 0
    }

    allAnswers.forEach(answer => {
      const question = surveyQuestions.find(q => q.id === answer.questionId)
      if (question) {
        const selectedOptionData = question.options[answer.selectedOption]
        Object.entries(selectedOptionData.traits).forEach(([trait, value]) => {
          scores[trait] = (scores[trait] || 0) + value
        })
      }
    })

    return scores
  }

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>질문 {currentQuestion + 1} / {surveyQuestions.length}</span>
            <span>{Math.round(progress)}% 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {surveyQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-3 mb-8">
            {surveyQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`survey-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedOption === index 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              이전
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded-lg font-medium ${
                selectedOption === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {currentQuestion === surveyQuestions.length - 1 ? '결과 보기' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
