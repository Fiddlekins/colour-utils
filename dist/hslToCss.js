"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslToCss = void 0;
function hslToCss(hsl, alpha = 1, precision) {
    let h = hsl.h * 360;
    let s = hsl.s * 100;
    let l = hsl.l * 100;
    let a = alpha;
    if (typeof precision === 'number') {
        h = h.toFixed(precision);
        s = s.toFixed(precision);
        l = l.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (alpha === 1) {
        return `hsl(${h} ${s}% ${l}%)`;
    }
    else {
        return `hsl(${h} ${s}% ${l}% / ${a})`;
    }
}
exports.hslToCss = hslToCss;
//# sourceMappingURL=hslToCss.js.map