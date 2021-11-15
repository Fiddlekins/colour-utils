export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}

export { rgbToHsl } from './rgbToHsl';
export { hslToRgb } from './hslToRgb';
export { hslToCss } from './hslToCss';
export { rgbToCss } from './rgbToCss';
