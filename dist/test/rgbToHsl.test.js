"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
describe('rgbToHsl', () => {
    it('should convert right without alpha', () => {
        const rgb = { r: 0, g: 0, b: 0 };
        (0, chai_1.expect)((0, src_1.rgbToHsl)(rgb)).to.deep.equal({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('should convert right with alpha', () => {
        const rgb = { r: 0, g: 0, b: 0, a: 0 };
        (0, chai_1.expect)((0, src_1.rgbToHsl)(rgb)).to.deep.equal({ h: 0, s: 0, l: 0, a: 0 });
    });
});
//# sourceMappingURL=rgbToHsl.test.js.map