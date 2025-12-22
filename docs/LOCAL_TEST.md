# 로컬 테스트 가이드

npm에 배포하기 전에 로컬에서 패키지를 테스트하는 방법입니다.

## 방법 1: npm link 사용 (권장)

### 1단계: 라이브러리 프로젝트에서 링크 생성

```bash
# pui 프로젝트 디렉토리에서
npm run build
npm link
```

### 2단계: 테스트 프로젝트에서 링크 연결

```bash
# 테스트 프로젝트 디렉토리에서
npm link @skybaer0804/pui
```

### 3단계: 테스트 프로젝트에서 사용

```tsx
import { Button, Card, ThemeProvider } from '@skybaer0804/pui';
import '@skybaer0804/pui/styles';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Button>테스트</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### 4단계: 링크 해제 (필요시)

```bash
# 테스트 프로젝트에서
npm unlink @skybaer0804/pui

# 라이브러리 프로젝트에서
npm unlink
```

## 방법 2: npm pack 사용

### 1단계: 패키지 빌드 및 패키징

```bash
# pui 프로젝트 디렉토리에서
npm run build
npm pack
```

이 명령어는 `@skybaer0804-pui-1.0.0.tgz` 파일을 생성합니다.

### 2단계: 테스트 프로젝트에 설치

```bash
# 테스트 프로젝트 디렉토리에서
npm install ../pui/@skybaer0804-pui-1.0.0.tgz
# 또는 절대 경로 사용
npm install C:\project\pui\@skybaer0804-pui-1.0.0.tgz
```

### 3단계: 사용

방법 1과 동일하게 사용합니다.

## 방법 3: 상대 경로로 직접 설치 (개발 워크플로우 권장)

이 방법은 로컬 개발 시 가장 편리하며, 라이브러리 변경사항이 즉시 반영됩니다.

### 1단계: 테스트 프로젝트의 package.json에 추가

```json
{
  "dependencies": {
    "@skybaer0804/pui": "file:../pui"
  },
  "devDependencies": {
    "concurrently": "^9.1.0"
  },
  "scripts": {
    "dev": "vite",
    "dev:watch": "concurrently \"npm run dev:pui\" \"npm run dev\"",
    "dev:pui": "cd ../pui && npm run build:watch"
  }
}
```

### 2단계: 의존성 설치

```bash
# 테스트 프로젝트 디렉토리에서
npm install
```

### 3단계: 개발 워크플로우 실행

**옵션 A: Watch 모드와 함께 개발 (권장)**

라이브러리 변경사항이 자동으로 빌드되어 반영됩니다:

```bash
# 테스트 프로젝트 디렉토리에서
npm run dev:watch
```

이 명령어는 다음을 동시에 실행합니다:

- `pui-library`의 `build:watch` (변경사항 감지 시 자동 빌드)
- 테스트 프로젝트의 개발 서버

**옵션 B: 수동 빌드**

```bash
# 1. 라이브러리 프로젝트에서 빌드
cd ../pui
npm run build

# 2. 테스트 프로젝트에서 개발 서버 실행
cd ../your-test-project
npm run dev
```

### 4단계: 사용

```tsx
import { Button, Card, ThemeProvider } from '@skybaer0804/pui';
import '@skybaer0804/pui/styles.css';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Button>테스트</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### 장점

- ✅ 라이브러리 코드 수정 시 즉시 반영 (watch 모드 사용 시)
- ✅ npm link보다 안정적 (심볼릭 링크 문제 없음)
- ✅ 여러 프로젝트에서 동시에 사용 가능
- ✅ Git에 의존성 정보가 명확히 기록됨

## 개발 워크플로우 비교

| 방법           | 장점                                                  | 단점                                                   | 사용 시기                |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------ | ------------------------ |
| **npm link**   | 빠른 설정, 전역 링크                                  | 심볼릭 링크 문제 가능, 여러 프로젝트 동시 사용 시 충돌 | 간단한 테스트            |
| **npm pack**   | 실제 배포와 유사한 환경                               | 매번 패키징 필요, watch 모드 불가                      | 배포 전 최종 테스트      |
| **file: 경로** | 안정적, watch 모드 지원, 여러 프로젝트 동시 사용 가능 | 상대 경로 관리 필요                                    | **일반적인 개발 (권장)** |

## 주의사항

1. **빌드 필요**:

   - `file:` 방식 사용 시: `dev:watch` 스크립트 사용 시 자동 빌드됨
   - 수동 빌드 시: 코드를 수정한 후에는 반드시 `npm run build`를 실행해야 합니다.

2. **watch 모드**:

   - 라이브러리 프로젝트: `npm run build:watch` 또는 `npm run dev`
   - 테스트 프로젝트: `npm run dev:watch` (라이브러리 watch + 개발 서버 동시 실행)

3. **캐시 문제**:

   - 변경사항이 반영되지 않으면:
     - Vite 개발 서버 재시작
     - `node_modules` 삭제 후 `npm install` 재실행
     - 브라우저 캐시 클리어

4. **경로 설정**:
   - `file:../pui`는 라이브러리 프로젝트가 테스트 프로젝트의 상위 디렉토리에 있을 때 사용
   - 다른 구조라면 경로를 적절히 조정하세요 (예: `file:../../pui`)

## 빠른 테스트 스크립트

### 라이브러리 프로젝트 (pui/package.json)

```json
{
  "scripts": {
    "build:watch": "npm run build:styles && rollup -c -w",
    "link": "npm run build && npm link",
    "unlink": "npm unlink",
    "pack": "npm run build && npm pack"
  }
}
```

### 테스트 프로젝트 (예: pui-docs/package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "dev:watch": "concurrently \"npm run dev:pui\" \"npm run dev\"",
    "dev:pui": "cd ../pui && npm run build:watch"
  }
}
```

### 사용 예시

**라이브러리 프로젝트에서:**

```bash
npm run build:watch  # watch 모드로 빌드
npm run link         # 빌드 후 링크 생성 (npm link 방식 사용 시)
npm run unlink       # 링크 해제
```

**테스트 프로젝트에서:**

```bash
npm run dev:watch    # 라이브러리 watch + 개발 서버 동시 실행 (file: 방식)
npm run dev          # 개발 서버만 실행 (수동 빌드 시)
```

## 프로젝트 구조 예시

```
project/
├── pui/                    # 라이브러리 프로젝트
│   ├── package.json
│   ├── src/
│   └── dist/               # 빌드 산출물
│
├── pui-docs/               # 문서/데모 프로젝트
│   ├── package.json        # "@skybaer0804/pui": "file:../pui"
│   └── src/
│
└── spark-messaging-demo/    # 데모 앱 프로젝트
    ├── package.json        # "@skybaer0804/pui": "file:../pui"
    └── src/
```

이 구조에서 각 테스트 프로젝트는 `file:../pui`로 라이브러리를 참조합니다.
