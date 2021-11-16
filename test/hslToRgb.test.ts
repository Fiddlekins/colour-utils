import { expect } from 'chai';
import { hslToRgb } from '../src';

describe('hslToRgb', () => {
    it('should convert right without alpha', () => {
        const hsl = { h: 0, s: 0, l: 0 };
        expect(hslToRgb(hsl)).to.deep.equal({ r: 0, g: 0, b: 0, a: 1 });
    });
    it('should convert right with alpha', () => {
        const hsl = { h: 0, s: 0, l: 0, a: 0 };
        expect(hslToRgb(hsl)).to.deep.equal({ r: 0, g: 0, b: 0, a: 0 });
    });
});
