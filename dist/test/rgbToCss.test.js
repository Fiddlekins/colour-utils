"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
describe('rgbToCss', () => {
    it('should convert right without alpha', () => {
        const rgb = { r: 0, g: 0, b: 0 };
        (0, chai_1.expect)((0, src_1.rgbToCss)(rgb)).to.equal('rgb(0 0 0)');
    });
    it('should convert right with alpha', () => {
        const rgb = { r: 0, g: 0, b: 0, a: 0 };
        (0, chai_1.expect)((0, src_1.rgbToCss)(rgb)).to.equal('rgba(0 0 0 / 0)');
    });
});
//# sourceMappingURL=rgbToCss.test.js.map