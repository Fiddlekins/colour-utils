import { HSL, RGB } from './index';

function hueToRgb(v1: number, v2: number, vH: number): number {
    if (vH < 0) {
        vH += 1;
    }
    if (vH > 1) {
        vH -= 1;
    }
    if ((6 * vH) < 1) {
        return (v1 + (v2 - v1) * 6 * vH);
    }
    if ((2 * vH) < 1) {
        return v2;
    }
    if ((3 * vH) < 2) {
        return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
    }
    return v1;
}

export function hslToRgb(hsl: HSL): RGB {
    const { h, s, l, a } = hsl;
    const rgb: RGB = { r: 0, g: 0, b: 0, a: a ?? 1 };
    if (s === 0) {
        rgb.r = l * 255;
        rgb.g = l * 255;
        rgb.b = l * 255;
    } else {
        let var_2;
        if (l < 0.5) {
            var_2 = l * (1 + s);
        } else {
            var_2 = (l + s) - (s * l);
        }
        const var_1 = 2 * l - var_2;
        rgb.r = 255 * hueToRgb(var_1, var_2, h + (1 / 3));
        rgb.g = 255 * hueToRgb(var_1, var_2, h);
        rgb.b = 255 * hueToRgb(var_1, var_2, h - (1 / 3));
    }
    return rgb;
}
