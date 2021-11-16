import { expect } from 'chai';
import { hslToCss } from '../src';

describe('hslToCss', () => {
    it('should convert right without alpha', () => {
        const hsl = { h: 0, s: 0, l: 0 };
        expect(hslToCss(hsl)).to.equal('hsl(0 0% 0%)');
    });
    it('should convert right with alpha', () => {
        const hsl = { h: 0, s: 0, l: 0, a: 0 };
        expect(hslToCss(hsl)).to.equal('hsl(0 0% 0% / 0)');
    });
});
