import { expect } from 'chai';
import { rgbToHsl } from '../src';

describe('rgbToHsl', () => {
    it('should convert right without alpha', () => {
        const rgb = { r: 0, g: 0, b: 0 };
        expect(rgbToHsl(rgb)).to.deep.equal({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('should convert right with alpha', () => {
        const rgb = { r: 0, g: 0, b: 0, a: 0 };
        expect(rgbToHsl(rgb)).to.deep.equal({ h: 0, s: 0, l: 0, a: 0 });
    });
});
