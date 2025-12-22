// sx prop 타입 및 유틸리티 함수
import { JSX } from 'preact';

export type SxProps = JSX.CSSProperties | ((theme: any) => JSX.CSSProperties);

/**
 * sx prop을 인라인 스타일 객체로 변환
 */
export function sxToStyle(sx?: SxProps): JSX.CSSProperties | undefined {
    if (!sx) return undefined;
    if (typeof sx === 'function') {
        // 함수인 경우 theme을 전달 (현재는 빈 객체, 필요시 확장 가능)
        return sx({});
    }
    return sx;
}
