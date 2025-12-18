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
