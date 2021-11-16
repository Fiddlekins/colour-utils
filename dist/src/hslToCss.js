"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslToCss = void 0;
function hslToCss(hsl, precision) {
    var _a;
    let h = hsl.h * 360;
    let s = hsl.s * 100;
    let l = hsl.l * 100;
    let a = (_a = hsl.a) !== null && _a !== void 0 ? _a : 1;
    const withAlpha = a !== 1;
    if (typeof precision === 'number') {
        h = h.toFixed(precision);
        s = s.toFixed(precision);
        l = l.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (withAlpha) {
        return `hsl(${h} ${s}% ${l}% / ${a})`;
    }
    else {
        return `hsl(${h} ${s}% ${l}%)`;
    }
}
exports.hslToCss = hslToCss;
//# sourceMappingURL=hslToCss.js.map