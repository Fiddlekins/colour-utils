export interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}

export { rgbToHsl } from './rgbToHsl';
export { hslToRgb } from './hslToRgb';
export { hslToCss } from './hslToCss';
export { rgbToCss } from './rgbToCss';
export { parseCssToRgb, parseCssToHsl } from './parseCss';
