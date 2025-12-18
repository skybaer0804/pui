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

## 방법 3: 상대 경로로 직접 설치

### 테스트 프로젝트의 package.json에 추가

```json
{
    "dependencies": {
        "@skybaer0804/pui": "file:../pui"
    }
}
```

그 다음:

```bash
npm install
```

## 주의사항

1. **빌드 필요**: 코드를 수정한 후에는 반드시 `npm run build`를 실행해야 합니다.
2. **watch 모드**: 개발 중에는 `npm run dev`를 사용하여 자동 빌드할 수 있습니다.
3. **캐시 문제**: 변경사항이 반영되지 않으면 `node_modules`를 삭제하고 다시 설치하세요.

## 빠른 테스트 스크립트

package.json에 다음 스크립트를 추가하면 더 편리합니다:

```json
{
    "scripts": {
        "link": "npm run build && npm link",
        "unlink": "npm unlink"
    }
}
```

사용:

```bash
npm run link    # 빌드 후 링크 생성
npm run unlink  # 링크 해제
```
