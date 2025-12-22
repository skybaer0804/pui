# PUI - Preact UI Library

Preact 기반의 UI 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @skybaer0804/pui
# 또는
yarn add @skybaer0804/pui
# 또는
pnpm add @skybaer0804/pui
```

## 사용 방법

### 전체 라이브러리 import

```tsx
import { Button, Card, ThemeProvider } from '@skybaer0804/pui';
import '@skybaer0804/pui/styles.css';

function App() {
    return (
        <ThemeProvider>
            <Card>
                <Button>클릭하세요</Button>
            </Card>
        </ThemeProvider>
    );
}
```

### 개별 컴포넌트 import (Tree-shaking 지원)

MUI처럼 특정 컴포넌트만 import하여 사용할 수 있습니다:

```tsx
import { Button } from '@skybaer0804/pui/Button';
import { Card } from '@skybaer0804/pui/Card';
import { ThemeProvider } from '@skybaer0804/pui/ThemeProvider';
import '@skybaer0804/pui/styles.css';
```

### 디자인 토큰 오버라이드

`ThemeProvider`의 `tokenOverrides` prop을 사용하여 디자인 토큰을 커스터마이징할 수 있습니다:

```tsx
import { ThemeProvider } from '@skybaer0804/pui';
import type { DesignTokenOverrides } from '@skybaer0804/pui';

const tokenOverrides: DesignTokenOverrides = {
    '--color-interactive-primary': '#ff0000',
    '--primitive-space-4': '20px',
    '--primitive-radius-md': '8px',
};

function App() {
    return <ThemeProvider tokenOverrides={tokenOverrides}>{/* ... */}</ThemeProvider>;
}
```

## 스타일 유의사항

### ⚠️ 필수: 스타일 import

PUI 라이브러리는 **A-plan 구조**를 사용합니다. 모든 컴포넌트 스타일은 JS 번들에 포함되지 않으며, 별도의 CSS 파일로 제공됩니다.

**반드시 프로젝트의 시작점(예: `main.tsx`, `app.tsx`)에서 한 번만 스타일을 import해야 합니다:**

```tsx
// ✅ 올바른 사용법
import '@skybaer0804/pui/styles.css';

// 또는
import '@skybaer0804/pui/styles';
```

### 중요 사항

-   **스타일은 JS 번들에 포함되지 않습니다**: 각 컴포넌트 파일에는 스타일 import가 없습니다.
-   **한 번만 import**: 전체 라이브러리 import든 개별 컴포넌트 import든 상관없이 `styles.css`는 **프로젝트 시작점에서 한 번만** import하면 됩니다.
-   **스타일 없이는 동작하지 않습니다**: `styles.css`를 import하지 않으면 컴포넌트가 제대로 렌더링되지 않습니다.
-   **Tree-shaking과 무관**: 개별 컴포넌트만 사용하더라도 전체 스타일을 import해야 합니다. (모든 스타일이 `pui.scss`에서 통합되어 있기 때문)

### 예시

```tsx
// main.tsx 또는 app.tsx
import '@skybaer0804/pui/styles.css'; // ✅ 여기서 한 번만 import

// 다른 파일들에서는 컴포넌트만 import
import { Button } from '@skybaer0804/pui/Button';
import { Card } from '@skybaer0804/pui/Card';
```

## 주요 기능

-   ✅ Preact 기반의 경량 UI 컴포넌트
-   ✅ Tree-shaking 지원 (개별 컴포넌트 import)
-   ✅ 디자인 토큰 시스템
-   ✅ 다크 모드 지원
-   ✅ 반응형 디자인
-   ✅ TypeScript 지원
-   ✅ 디자인 토큰 오버라이드 지원

## 컴포넌트 목록

-   Layout: Box, Flex, Stack, Container, Grid
-   Button: Button, IconButton, ButtonGroup, FloatingActionButton
-   Form: Input, TextField, Select, Checkbox, Radio, RadioGroup, Switch
-   Navigation: Tabs, BottomNavigation, Breadcrumbs, Stepper, Pagination
-   Feedback: Alert, CircularProgress, Loading, Skeleton
-   Data Display: Typography, Avatar, Badge, StatusChip, Table, List
-   Surface: Paper, Divider, Card
-   Overlay: Dialog, Drawer, Tooltip
-   Disclosure: Accordion, Collapsible
-   Navigation: SpeedDial

## 라이선스

MIT
