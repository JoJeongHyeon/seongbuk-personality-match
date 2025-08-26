# 🚀 성북구 인물 추천 시스템 배포 가이드

이 문서는 성북구 인물 추천 시스템을 실제 서버에 배포하고 웹호스팅하는 방법을 설명합니다.

## 📋 목차

1. [배포 플랫폼 선택](#배포-플랫폼-선택)
2. [Vercel 배포 (권장)](#vercel-배포-권장)
3. [Netlify 배포](#netlify-배포)
4. [환경 변수 설정](#환경-변수-설정)
5. [도메인 연결](#도메인-연결)
6. [문제 해결](#문제-해결)

---

## 🎯 배포 플랫폼 선택

### 추천 순위

| 플랫폼 | 난이도 | 비용 | Next.js 지원 | 추천도 |
|--------|--------|------|-------------|---------|
| **Vercel** | ⭐ | 무료 | 완벽 | 🥇 |
| **Netlify** | ⭐⭐ | 무료 | 좋음 | 🥈 |
| **Railway** | ⭐⭐ | 유료 | 완벽 | 🥉 |

---

## 🚀 Vercel 배포 (권장)

### 장점
- Next.js 개발사에서 만든 플랫폼
- 무료 플랜으로 충분
- 자동 HTTPS, CDN 제공
- Git 연동으로 자동 배포

### 1단계: Vercel 계정 생성
1. [vercel.com](https://vercel.com) 방문
2. GitHub 계정으로 로그인
3. 무료 계정 생성

### 2단계: Git 설치 (필요한 경우)

Git이 설치되어 있지 않다면 먼저 설치해야 합니다.

#### Git 설치 확인
```powershell
git --version
```

만약 `'git' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다` 오류가 나온다면:

#### Git 설치 방법

**방법 1: Git for Windows 직접 설치 (권장)**
1. [git-scm.com](https://git-scm.com/download/win) 방문
2. **"Download for Windows"** 클릭
3. 다운로드된 설치 파일 실행
4. 설치 과정에서 모든 옵션을 기본값으로 유지
5. 설치 완료 후 **PowerShell 재시작**
6. `git --version` 명령어로 설치 확인

**방법 2: Chocolatey 사용**
```powershell
# 관리자 권한으로 PowerShell 실행 후
choco install git
```

### 3단계: 프로젝트를 GitHub에 업로드

#### 3-1. GitHub에서 저장소 생성 (웹사이트에서)
1. [github.com](https://github.com) 로그인
2. 우상단 **"+"** 버튼 클릭 → **"New repository"** 선택
3. **Repository name**: `seongbuk-personality-match` (또는 원하는 이름)
4. **Public** 또는 **Private** 선택
5. **"Create repository"** 클릭
6. 생성된 저장소 URL 복사 (예: `https://github.com/YOUR_USERNAME/seongbuk-personality-match.git`)

#### 3-2. 로컬에서 Git 설정 및 업로드
```powershell
# 프로젝트 디렉토리에서
cd "C:\Users\조정현\Desktop\성북"

# Git 초기화
git init

# Git 사용자 정보 설정 (처음 사용시)
git config --global user.name "당신의 이름"
git config --global user.email "your-email@example.com"

# .gitignore 파일 생성 (중요!)
echo "node_modules/" > .gitignore
echo ".next/" >> .gitignore
echo ".env.local" >> .gitignore
echo "*.log" >> .gitignore
echo "package-lock.json" >> .gitignore

# Git 캐시에서 node_modules 제거 (이미 추가했다면)
git rm -r --cached node_modules
git rm --cached package-lock.json

# 파일 추가 및 커밋
git add .
git commit -m "Initial commit: 성북 인물 추천 시스템"

# GitHub 저장소 연결 (위에서 복사한 URL 사용)
git branch -M main
git remote add origin https://github.com/JoJeongHyeon/seongbuk-personality-match.git
git push -u origin main
```

### 4단계: Vercel에 배포
1. Vercel 대시보드에서 **"New Project"** 클릭
2. GitHub 저장소 선택
3. **Framework Preset**: Next.js (자동 감지)
4. **Environment Variables** 설정:
   - `OPENAI_API_KEY`: 실제 OpenAI API 키 입력
5. **Deploy** 클릭

### 5단계: 배포 완료
- 2-3분 후 배포 완료
- `https://your-project-name.vercel.app` 형태의 URL 생성
- 자동으로 HTTPS 적용

---

## 🌐 Netlify 배포

### 1단계: Netlify 계정 생성
1. [netlify.com](https://netlify.com) 방문
2. GitHub 계정으로 로그인

### 2단계: 빌드 설정
```powershell
# netlify.toml 파일 생성
echo '[build]' > netlify.toml
echo '  command = "npm run build"' >> netlify.toml
echo '  publish = ".next"' >> netlify.toml
echo '' >> netlify.toml
echo '[[redirects]]' >> netlify.toml
echo '  from = "/*"' >> netlify.toml
echo '  to = "/index.html"' >> netlify.toml
echo '  status = 200' >> netlify.toml
```

### 3단계: 배포
1. Netlify 대시보드에서 **"New site from Git"**
2. GitHub 저장소 연결
3. 빌드 설정 확인
4. 환경 변수 추가: `OPENAI_API_KEY`
5. Deploy



---

## 🔐 환경 변수 설정

### 각 플랫폼별 환경 변수 설정

#### Vercel
1. 프로젝트 대시보드 → Settings → Environment Variables
2. `OPENAI_API_KEY` 추가
3. Production, Preview, Development 모두 체크

#### Netlify
1. Site settings → Environment variables
2. `OPENAI_API_KEY` 추가



---

## 🌍 도메인 연결

### 1. 도메인 구매
- **Namecheap**, **GoDaddy**, **가비아** 등에서 도메인 구매
- 예: `seongbuk-match.com`

### 2. DNS 설정

#### Vercel의 경우
1. Vercel 프로젝트 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 제공업체에서 CNAME 레코드 설정:
   ```
   www.seongbuk-match.com → cname.vercel-dns.com
   seongbuk-match.com → 76.76.19.61 (A 레코드)
   ```

#### Netlify의 경우
1. Site settings → Domain management
2. 커스텀 도메인 추가
3. DNS 설정:
   ```
   www.seongbuk-match.com → your-site-name.netlify.app
   ```

### 3. HTTPS 인증서
- Vercel, Netlify: 자동으로 Let's Encrypt 인증서 적용

---

## 🛠 문제 해결

### 빌드 오류 해결

#### "Module not found" 오류
```powershell
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

#### GitHub 파일 크기 제한 오류
```
File node_modules/... is 129.57 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected.
```

**원인**: `node_modules` 폴더가 Git에 포함되어 GitHub 업로드 시 크기 제한 초과

**해결 방법:**
```powershell
# Git 캐시에서 대용량 파일들 제거
git rm -r --cached node_modules/
git rm -r --cached .next/
git rm --cached package-lock.json

# .gitignore 파일 재생성 (PowerShell 방식)
"node_modules/" | Out-File -FilePath .gitignore -Encoding UTF8
".next/" | Add-Content -Path .gitignore -Encoding UTF8  
".env.local" | Add-Content -Path .gitignore -Encoding UTF8
"*.log" | Add-Content -Path .gitignore -Encoding UTF8
"package-lock.json" | Add-Content -Path .gitignore -Encoding UTF8

# 다시 커밋 및 푸시
git add .
git commit -m "Fix: Remove node_modules and add proper .gitignore"
git push -u origin main
```

#### Git 사용자 정보 오류
```
Author identity unknown
*** Please tell me who you are.
```

**해결 방법:**
```powershell
# 전역 사용자 정보 설정
git config --global user.name "당신의 이름"
git config --global user.email "your-email@example.com"

# 설정 확인
git config --global user.name
git config --global user.email
```

#### API 라우트 404 오류
- Next.js 13+ App Router 구조 확인
- `app/api/` 폴더 구조가 올바른지 확인

### 환경 변수 오류
```javascript
// 환경 변수 확인 코드 (임시)
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
```

### 빌드 시간 초과
```json
// package.json에 추가
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

---

## 📊 성능 최적화

### 1. 이미지 최적화
```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 2. 캐싱 설정
```javascript
// API 라우트에 캐싱 추가
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
```

### 3. 번들 분석
```powershell
# 번들 크기 분석
npm install --save-dev @next/bundle-analyzer
npm run build
npm run analyze
```

---

## 🎉 배포 완료 체크리스트

- [ ] GitHub 저장소 생성 및 코드 업로드
- [ ] 배포 플랫폼 선택 (Vercel 권장)
- [ ] 환경 변수 설정 (OPENAI_API_KEY)
- [ ] 배포 성공 확인
- [ ] 실제 사이트에서 설문 테스트
- [ ] AI 분석 기능 정상 작동 확인
- [ ] 커스텀 도메인 연결 (선택사항)
- [ ] HTTPS 인증서 적용 확인

---

## 💡 추가 팁

### 무료 플랜 제한사항
- **Vercel**: 월 100GB 대역폭, 함수 실행 시간 10초
- **Netlify**: 월 100GB 대역폭, 함수 실행 시간 10초

### 비용 절약 방법
1. **OpenAI API 사용량 모니터링**
2. **캐싱 활용**으로 API 호출 줄이기
3. **이미지 최적화**로 대역폭 절약

### 모니터링
- Vercel Analytics 활용
- Google Analytics 연동
- 오류 추적: Sentry 연동

---

**🎯 이 가이드를 따라하면 성북구 인물 추천 시스템을 성공적으로 배포할 수 있습니다!**

궁금한 점이 있으면 각 플랫폼의 공식 문서를 참고하세요.
