import { RGB } from './index';

export function rgbToCss(rgb: RGB, alpha = 1, precision?: number): string {
    let r: number | string = rgb.r;
    let g: number | string = rgb.g;
    let b: number | string = rgb.b;
    let a: number | string = alpha;
    if (typeof precision === 'number') {
        r = r.toFixed(precision);
        g = g.toFixed(precision);
        b = b.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (alpha === 1) {
        return `rgb(${r} ${g} ${b})`;
    } else {
        return `rgba(${r} ${g} ${b} / ${a})`;
    }
}
