import figuresData from '@/data/figures.json'

export interface Figure {
  id: string
  name: string
  birth_year: number
  death_year: number
  occupation: string
  major_works: string[]
  personality_traits: {
    [key: string]: number
  }
  themes: string[]
  description: string
  seongbuk_connection: string
}

export interface TraitScores {
  [key: string]: number
}

export interface MatchResult {
  figure: Figure
  similarity: number
  matchingTraits: string[]
}

export function findBestMatch(userTraits: TraitScores): MatchResult {
  const figures = figuresData as Figure[]
  let bestMatch: MatchResult | null = null
  let highestSimilarity = -1

  figures.forEach(figure => {
    const similarity = calculateSimilarity(userTraits, figure.personality_traits)
    
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity
      const matchingTraits = getMatchingTraits(userTraits, figure.personality_traits)
      
      bestMatch = {
        figure,
        similarity,
        matchingTraits
      }
    }
  })

  return bestMatch!
}

function calculateSimilarity(userTraits: TraitScores, figureTraits: TraitScores): number {
  const traits = Object.keys(userTraits)
  let totalScore = 0
  let maxPossibleScore = 0

  traits.forEach(trait => {
    const userScore = userTraits[trait] || 0
    const figureScore = figureTraits[trait] || 0
    
    // 정규화: 사용자 점수를 0-10 범위로 변환
    const normalizedUserScore = Math.max(0, Math.min(10, userScore + 5))
    
    // 유사도 계산: 점수 차이가 적을수록 높은 점수
    const difference = Math.abs(normalizedUserScore - figureScore)
    const similarity = Math.max(0, 10 - difference)
    
    totalScore += similarity
    maxPossibleScore += 10
  })

  return (totalScore / maxPossibleScore) * 100
}

function getMatchingTraits(userTraits: TraitScores, figureTraits: TraitScores): string[] {
  const matchingTraits: string[] = []
  const traitNames: { [key: string]: string } = {
    introspective: '내성적',
    romantic: '낭만적',
    melancholic: '우울한',
    intellectual: '지적',
    traditional: '전통적',
    rebellious: '반항적',
    artistic: '예술적',
    social: '사회적'
  }

  Object.entries(userTraits).forEach(([trait, userScore]) => {
    const figureScore = figureTraits[trait] || 0
    const normalizedUserScore = Math.max(0, Math.min(10, userScore + 5))
    
    // 둘 다 높은 점수를 가진 특성을 매칭 특성으로 간주
    if (normalizedUserScore >= 6 && figureScore >= 6) {
      matchingTraits.push(traitNames[trait] || trait)
    }
  })

  return matchingTraits
}

export function getTopTraits(traits: TraitScores): Array<{ name: string, score: number }> {
  const traitNames: { [key: string]: string } = {
    introspective: '내성적',
    romantic: '낭만적',
    melancholic: '우울한',
    intellectual: '지적',
    traditional: '전통적',
    rebellious: '반항적',
    artistic: '예술적',
    social: '사회적'
  }

  return Object.entries(traits)
    .map(([key, value]) => ({
      name: traitNames[key] || key,
      score: value
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
