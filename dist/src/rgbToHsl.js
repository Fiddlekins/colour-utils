"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHsl = void 0;
function rgbToHsl(rgb) {
    const { r, g, b, a } = rgb;
    const hsl = { h: 0, s: 0, l: 0, a: a !== null && a !== void 0 ? a : 1 };
    const var_R = r / 255;
    const var_G = g / 255;
    const var_B = b / 255;
    const var_Min = Math.min(var_R, var_G, var_B);
    const var_Max = Math.max(var_R, var_G, var_B);
    const del_Max = var_Max - var_Min;
    hsl.l = (var_Max + var_Min) / 2;
    if (del_Max === 0) {
        hsl.h = 0;
        hsl.s = 0;
    }
    else {
        if (hsl.l < 0.5) {
            hsl.s = del_Max / (var_Max + var_Min);
        }
        else {
            hsl.s = del_Max / (2 - var_Max - var_Min);
        }
        const del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max;
        const del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max;
        const del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max;
        if (var_R === var_Max) {
            hsl.h = del_B - del_G;
        }
        else if (var_G === var_Max) {
            hsl.h = (1 / 3) + del_R - del_B;
        }
        else if (var_B === var_Max) {
            hsl.h = (2 / 3) + del_G - del_R;
        }
        else {
            hsl.h = 0;
        }
        if (hsl.h < 0) {
            hsl.h += 1;
        }
        if (hsl.h > 1) {
            hsl.h -= 1;
        }
    }
    return hsl;
}
exports.rgbToHsl = rgbToHsl;
//# sourceMappingURL=rgbToHsl.js.map