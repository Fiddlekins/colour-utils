"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToCss = void 0;
function rgbToCss(rgb, precision) {
    var _a;
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;
    let a = (_a = rgb.a) !== null && _a !== void 0 ? _a : 1;
    const withAlpha = a !== 1;
    if (typeof precision === 'number') {
        r = r.toFixed(precision);
        g = g.toFixed(precision);
        b = b.toFixed(precision);
        a = a.toFixed(precision);
    }
    if (withAlpha) {
        return `rgba(${r} ${g} ${b} / ${a})`;
    }
    else {
        return `rgb(${r} ${g} ${b})`;
    }
}
exports.rgbToCss = rgbToCss;
//# sourceMappingURL=rgbToCss.js.map