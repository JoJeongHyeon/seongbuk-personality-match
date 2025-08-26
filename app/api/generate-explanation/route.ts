import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { figureName, userTraits, figureTraits, matchingTraits, figureDescription, themes } = await request.json()

    const prompt = `당신은 문학과 인물 분석 전문가입니다. 다음 정보를 바탕으로 사용자와 문학인의 유사점을 자연스럽고 친근하게 설명해주세요.

**문학인**: ${figureName}
**문학인 소개**: ${figureDescription}
**문학인의 주요 테마**: ${themes.join(', ')}

**사용자의 성향 점수**: ${JSON.stringify(userTraits)}
**문학인의 성향 점수**: ${JSON.stringify(figureTraits)}
**주요 공통 특성**: ${matchingTraits.join(', ')}

다음 조건에 맞춰 설명해주세요:
1. 200-300자 정도의 적당한 길이
2. "당신은 ${figureName}과 닮았습니다" 형태로 시작
3. 구체적인 공통점을 2-3개 언급
4. 친근하고 긍정적인 톤으로 작성
5. 문학인의 특성과 사용자의 성향을 자연스럽게 연결

예시 형태:
"당신은 [인물명]과 닮았습니다. [구체적 유사점 1], [구체적 유사점 2] 등에서 특히 비슷한 면을 보입니다. [인물의 특성]처럼 당신도 [사용자 특성]을 가지고 있어, [긍정적 평가나 격려]."

당신의 답변:
`

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'gpt-5-mini',
      //max_completion_tokens: 1000,
      reasoning_effort: 'low',
    })

    // 간단한 응답 체크
    const content = completion.choices?.[0]?.message?.content
    
    if (!content || content.trim() === '') {
      console.error('❌ API 응답 content 없음:', {
        finish_reason: completion.choices?.[0]?.finish_reason,
        usage: completion.usage
      })
      return NextResponse.json({ 
        explanation: '설명을 생성할 수 없습니다. 다시 시도해주세요.'
      })
    }
    
    const explanation = content

    return NextResponse.json({ explanation })
  } catch (error) {
    console.error('Error generating explanation:', error)
    
    // 더 자세한 에러 정보 로깅
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate explanation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
