import { RGB } from './index';

export function rgbToCss(rgb: RGB, precision?: number): string {
    let r: number | string = rgb.r;
    let g: number | string = rgb.g;
    let b: number | string = rgb.b;
    let a: number | string = rgb.a ?? 1;
    const withAlpha = a !== 1;
    if (typeof precision === 'number') {
        r = r.toFixed(precision);
        g = g.toFixed(precision);
        b = b.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (withAlpha) {
        return `rgba(${r} ${g} ${b} / ${a})`;
    } else {
        return `rgb(${r} ${g} ${b})`;
    }
}
