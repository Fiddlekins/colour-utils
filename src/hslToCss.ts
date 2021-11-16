import { HSL } from './index';

export function hslToCss(hsl: HSL, precision?: number): string {
    let h: number | string = hsl.h * 360;
    let s: number | string = hsl.s * 100;
    let l: number | string = hsl.l * 100;
    let a: number | string = hsl.a ?? 1;
    const withAlpha = a !== 1;
    if (typeof precision === 'number') {
        h = h.toFixed(precision);
        s = s.toFixed(precision);
        l = l.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (withAlpha) {
        return `hsl(${h} ${s}% ${l}% / ${a})`;
    } else {
        return `hsl(${h} ${s}% ${l}%)`;
    }
}
