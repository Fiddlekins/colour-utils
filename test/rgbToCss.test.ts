import { expect } from 'chai';
import { rgbToCss } from '../src';

describe('rgbToCss', () => {
    it('should convert right without alpha', () => {
        const rgb = { r: 0, g: 0, b: 0 };
        expect(rgbToCss(rgb)).to.equal('rgb(0 0 0)');
    });
    it('should convert right with alpha', () => {
        const rgb = { r: 0, g: 0, b: 0, a: 0 };
        expect(rgbToCss(rgb)).to.equal('rgba(0 0 0 / 0)');
    });
});
