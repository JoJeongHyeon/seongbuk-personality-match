# 성북구 인물 추천 시스템

성북구와 인연이 깊은 문학인들 중에서 당신과 가장 닮은 인물을 찾아주는 웹 애플리케이션입니다.

## 🎯 주요 기능

- **개성 분석 설문**: 8개의 심리적 특성을 분석하는 설문조사
- **AI 기반 매칭**: 사용자의 성향과 문학인의 특성을 비교하여 최적의 매치 찾기
- **GPT 설명 생성**: OpenAI GPT-5-mini를 활용한 개인화된 매칭 이유 설명
- **반응형 웹 디자인**: 모바일과 데스크톱 모든 환경에서 최적화된 사용자 경험

## 📚 포함된 문학인

- **계용묵** (소설가, 1904-1961)
- **김광균** (시인, 1914-1993)
- **김동리** (소설가, 1913-1995)
- **김환기** (화가, 1913-1974)
- **박경리** (소설가, 1926-2008)
- **박목월** (시인, 1916-1978)
- **박완서** (소설가, 1931-2011)
- **오탁번** (시인, 번역가, 1916-1979)
- **임화** (시인, 문학평론가, 1908-1953)
- **조지훈** (시인, 국문학자, 1920-1968)
- **최인훈** (소설가, 1936-2013)

## 🛠 기술 스택

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-5-mini API
- **Deployment**: Vercel (권장)

## 🚀 설치 및 실행

### 방법 선택 가이드
- **Docker (권장)**: 완전한 격리 환경, 시스템에 영향 없음
- **nvm**: 가볍고 빠름, Node.js 버전만 관리

---

## 🐳 방법 1: Docker 사용 (권장)

### 전제 조건
- **Docker Desktop for Windows** 설치 필요
- **Windows PowerShell** 또는 **Command Prompt** 사용

### 1단계: Docker Desktop 설치
1. [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) 다운로드
2. 설치 후 Docker Desktop 실행
3. Docker가 정상 작동하는지 확인:
   ```powershell
   docker --version
   docker-compose --version
   ```

### 2단계: 프로젝트 준비
```powershell
# PowerShell에서 프로젝트 디렉토리로 이동
cd "C:\Users\조정현\Desktop\성북"

# 프로젝트 파일 확인
Get-ChildItem
```

### 3단계: 환경 변수 설정
`.env.local` 파일에 OpenAI API 키가 설정되어 있는지 확인하세요:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 4단계: Docker로 애플리케이션 실행

#### 개발 환경 (권장)
```powershell
# 개발용 서버 실행 (핫 리로드 포함)
docker-compose up seongbuk-dev
```
브라우저에서 **http://localhost:3001** 로 접속

#### 프로덕션 환경
```powershell
# 프로덕션용 서버 실행
docker-compose up seongbuk-app
```
브라우저에서 **http://localhost:3000** 로 접속

### 5단계: 서버 종료
```powershell
# Ctrl+C로 서버 종료 또는
docker-compose down
```

---

## ⚡ 방법 2: nvm 사용 (가볍고 빠름)

### 전제 조건
- **Windows PowerShell** 또는 **Git Bash** 사용
- Node.js가 로컬에 설치됨 (격리는 버전만)

### 1단계: nvm 설치 (Windows)
```powershell
# nvm-windows 다운로드 및 설치
# https://github.com/coreybutler/nvm-windows/releases 에서 nvm-setup.zip 다운로드
# 설치 후 PowerShell 재시작
```

### 2단계: Node.js 설치 및 사용
```powershell
# 프로젝트 디렉토리로 이동
cd "C:\Users\조정현\Desktop\성북"

# Node.js 18.17.0 설치
nvm install 18.17.0

# 해당 버전 사용
nvm use 18.17.0

# 버전 확인
node --version
```

### 3단계: 프로젝트 실행
```powershell
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 **http://localhost:3000** 으로 접속

### nvm vs Docker 비교표

| 구분 | Docker | nvm |
|------|--------|-----|
| **격리 수준** | 완전 격리 (OS 수준) | Node.js 버전만 격리 |
| **시스템 영향** | 없음 | 로컬에 패키지 설치 |
| **실행 속도** | 약간 느림 | 빠름 |
| **설정 복잡도** | 중간 | 간단 |
| **디스크 사용량** | 많음 | 적음 |
| **권장 상황** | 완전한 격리 필요시 | 빠른 개발 환경 |

---

## 📱 사용 방법

1. **시작하기**: 메인 페이지에서 "설문 시작하기" 버튼 클릭
2. **설문 응답**: 8개의 질문에 자신의 성향에 맞게 답변
3. **결과 확인**: AI가 분석한 매칭 결과와 설명 확인
4. **재테스트**: 원하는 경우 다시 설문 진행 가능

## 🧠 매칭 알고리즘

시스템은 다음 8가지 심리적 특성을 분석합니다:
- **내성적 (Introspective)**: 내면 탐구 성향
- **낭만적 (Romantic)**: 감성적, 이상주의적 성향
- **우울한 (Melancholic)**: 깊이 있는 사색, 때로는 우울한 성향
- **지적 (Intellectual)**: 논리적 사고와 학문적 관심
- **전통적 (Traditional)**: 전통 가치와 관습 중시
- **반항적 (Rebellious)**: 기존 질서에 대한 도전 정신
- **예술적 (Artistic)**: 창조적 표현과 미적 감각
- **사회적 (Social)**: 사회 참여와 공동체 의식

## 🎨 디자인 특징

- **직관적 인터페이스**: 사용자 친화적인 설문 진행 과정
- **진행률 표시**: 실시간 설문 진행 상황 표시
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **시각적 결과**: 차트와 그래프를 통한 직관적인 결과 표시

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🛠 문제 해결

### Docker Desktop이 실행되지 않는 경우
1. Docker Desktop 재시작
2. Windows 재부팅
3. WSL 2 업데이트 확인

### 포트가 이미 사용 중인 경우
```powershell
# 포트 사용 중인 프로세스 확인
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# 필요시 해당 프로세스 종료
taskkill /PID <process_id> /F
```

### 컨테이너 빌드 오류가 발생하는 경우
```powershell
# Docker 캐시 정리
docker system prune -a

# 강제 재빌드
docker-compose build --no-cache seongbuk-dev
```

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.
