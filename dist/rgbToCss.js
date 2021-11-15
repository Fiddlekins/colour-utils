"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToCss = void 0;
function rgbToCss(rgb, alpha = 1, precision) {
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;
    let a = alpha;
    if (typeof precision === 'number') {
        r = r.toFixed(precision);
        g = g.toFixed(precision);
        b = b.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (alpha === 1) {
        return `rgb(${r} ${g} ${b})`;
    }
    else {
        return `rgba(${r} ${g} ${b} / ${a})`;
    }
}
exports.rgbToCss = rgbToCss;
//# sourceMappingURL=rgbToCss.js.map