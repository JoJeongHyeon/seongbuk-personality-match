import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { figureName, userTraits, figureTraits, matchingTraits, figureDescription, themes, encouragement } = await request.json()

    const prompt = `당신은 한국사와 독립운동사 전문가입니다. 다음 정보를 바탕으로 사용자와 독립운동가의 유사점을 따뜻하고 개인적으로 설명해주세요.

**독립운동가**: ${figureName}
**인물 소개**: ${figureDescription}
**주요 활동 분야**: ${themes.join(', ')}

**사용자의 성향 점수**: ${JSON.stringify(userTraits)}
**독립운동가의 성향 점수**: ${JSON.stringify(figureTraits)}
**주요 공통 특성**: ${matchingTraits.join(', ')}

${encouragement ? `**사용자가 알에게 건넨 격려의 말**: "${encouragement}"` : ''}

다음 조건에 맞춰 설명해주세요:
1. 5-6문장 정도의 자연스러운 길이로 작성
2. "당신은 ${figureName}과 닮았습니다" 형태로 시작
3. 구체적인 공통점과 역사적 맥락을 풍부하게 설명
4. 따뜻하고 개인적인 톤으로 작성
5. 독립운동가의 삶과 사용자의 성향을 깊이 있게 연결
6. ${encouragement ? '사용자의 격려 메시지의 정신을 반영하여 더욱 개인적이고 감동적으로' : ''}
7. 마지막에는 사용자에게 긍정적인 격려나 인사이트 제공

자유롭게 표현하되, 역사적 사실에 기반하여 진정성 있게 작성해주세요.

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
