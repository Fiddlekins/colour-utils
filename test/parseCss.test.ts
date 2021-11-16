import { expect } from 'chai';
import {
    parseAlphaChannelString,
    parseAngle,
    parseColourChannelString,
    parseCssToHsl,
    parseCssToRgb,
    parseHex,
    parseHsl,
    parseRgb,
} from '../src/parseCss';
import { HSL, RGB } from '../src';

describe('parseColourChannelString', () => {
    it('should parse "X" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.5', 0.5],
            ['50', 50],
            ['255', 255],
            ['300', 255],
            ['-255', 0],
            ['-1', 0],
        ];
        for (const [input, output] of tests) {
            expect(parseColourChannelString(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "X%" correctly', () => {
        const tests: [string, number][] = [
            ['0%', 0],
            ['00%', 0],
            ['0.5%', 1.275],
            ['50%', 127.5],
            ['99%', 252.45],
            ['100%', 255],
            ['200%', 255],
            ['-100%', 0],
            ['-1%', 0],
        ];
        for (const [input, output] of tests) {
            expect(parseColourChannelString(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseAlphaChannelString', () => {
    it('should parse "X" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.5', 0.5],
            ['1', 1],
            ['2', 1],
            ['-0.5', 0],
            ['-1', 0],
        ];
        for (const [input, output] of tests) {
            expect(parseAlphaChannelString(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "X%" correctly', () => {
        const tests: [string, number][] = [
            ['0%', 0],
            ['00%', 0],
            ['0.5%', 0.005],
            ['50%', 0.5],
            ['99%', 0.99],
            ['100%', 1],
            ['200%', 1],
            ['-100%', 0],
            ['-1%', 0],
        ];
        for (const [input, output] of tests) {
            expect(parseAlphaChannelString(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseAngle', () => {
    it('should parse "X" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.5', 0.5 / 360],
            ['90', 0.25],
            ['180', 0.5],
            ['270', 0.75],
            ['360', 0],
            ['-0.5', 1 - (0.5 / 360)],
            ['-90', 0.75],
        ];
        for (const [input, output] of tests) {
            expect(parseAngle(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "Xdeg" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.5', 0.5 / 360],
            ['90', 0.25],
            ['180', 0.5],
            ['270', 0.75],
            ['360', 0],
            ['540', 0.5],
            ['720', 0],
            ['-0.5', 1 - (0.5 / 360)],
            ['-90', 0.75],
            ['-540', 0.50],
        ];
        for (const [input, output] of tests) {
            expect(parseAngle(input, 'deg')).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "Xrad" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            [`${Math.PI}`, 0.5],
            [`${Math.PI / 2}`, 0.25],
            [`${Math.PI * 1.5}`, 0.75],
            [`${Math.PI * 2}`, 0],
            [`${Math.PI * 3}`, 0.5],
            [`${Math.PI * 4}`, 0],
            [`-${Math.PI / 2}`, 0.75],
            [`-${Math.PI * 1.5}`, 0.25],
            [`-${Math.PI * 2}`, 0],
            [`-${Math.PI * 3}`, 0.5],
            [`-${Math.PI * 4}`, 0],
        ];
        for (const [input, output] of tests) {
            expect(parseAngle(input, 'rad')).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "Xgrad" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.5', 0.5 / 400],
            ['100', 0.25],
            ['200', 0.5],
            ['300', 0.75],
            ['400', 0],
            ['600', 0.5],
            ['800', 0],
            ['-0.5', 1 - (0.5 / 400)],
            ['-100', 0.75],
            ['-600', 0.50],
        ];
        for (const [input, output] of tests) {
            expect(parseAngle(input, 'grad')).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "Xturn" correctly', () => {
        const tests: [string, number][] = [
            ['0', 0],
            ['00', 0],
            ['0.005', 0.005],
            ['0.25', 0.25],
            ['0.5', 0.5],
            ['0.75', 0.75],
            ['1', 0],
            ['1.5', 0.5],
            ['2', 0],
            ['-0.005', 1 - 0.005],
            ['-0.25', 0.75],
            ['-1.5', 0.50],
        ];
        for (const [input, output] of tests) {
            expect(parseAngle(input, 'turn')).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseHex', () => {
    it('should parse "#RGB" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['#000', { r: 0, g: 0, b: 0, a: 1 }],
            ['#123', { r: 17, g: 34, b: 51, a: 1 }],
            ['#d6a', { r: 221, g: 102, b: 170, a: 1 }],
            ['#fff', { r: 255, g: 255, b: 255, a: 1 }],
            ['#ggg', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHex(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "#RGBA" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['#0000', { r: 0, g: 0, b: 0, a: 0 }],
            ['#0006', { r: 0, g: 0, b: 0, a: 0.4 }],
            ['#000f', { r: 0, g: 0, b: 0, a: 1 }],
            ['#1230', { r: 17, g: 34, b: 51, a: 0 }],
            ['#d6a6', { r: 221, g: 102, b: 170, a: 0.4 }],
            ['#ffff', { r: 255, g: 255, b: 255, a: 1 }],
            ['#gggf', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHex(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "#RRGGBB" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['#000000', { r: 0, g: 0, b: 0, a: 1 }],
            ['#112233', { r: 17, g: 34, b: 51, a: 1 }],
            ['#dd66aa', { r: 221, g: 102, b: 170, a: 1 }],
            ['#ffffff', { r: 255, g: 255, b: 255, a: 1 }],
            ['#gggggg', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHex(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "#RRGGBBAA" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['#00000000', { r: 0, g: 0, b: 0, a: 0 }],
            ['#00000066', { r: 0, g: 0, b: 0, a: 0.4 }],
            ['#000000ff', { r: 0, g: 0, b: 0, a: 1 }],
            ['#11223300', { r: 17, g: 34, b: 51, a: 0 }],
            ['#dd66aa66', { r: 221, g: 102, b: 170, a: 0.4 }],
            ['#ffffffff', { r: 255, g: 255, b: 255, a: 1 }],
            ['#ggggggff', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHex(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseRgb', () => {
    it('should parse "rgb(R G B)" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['rgb(0 0 0)', { r: 0, g: 0, b: 0, a: 1 }],
            ['rgb(17 34 51)', { r: 17, g: 34, b: 51, a: 1 }],
            ['rgb(221 102 170)', { r: 221, g: 102, b: 170, a: 1 }],
            ['rgb(255 255 255)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgb(300 300 300)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgb(-300 -300 -300)', { r: 0, g: 0, b: 0, a: 1 }],
            ['rgb(-300 300 -300)', { r: 0, g: 255, b: 0, a: 1 }],
            ['rgb(17.123 34% 51)', { r: 17.123, g: 86.7, b: 51, a: 1 }],
            ['rgb(0.001 102 70.123%)', { r: 0.001, g: 102, b: 178.81365000000002, a: 1 }],
        ];
        for (const [input, output] of tests) {
            expect(parseRgb(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "rgb(R, G, B)" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['rgb(0, 0, 0)', { r: 0, g: 0, b: 0, a: 1 }],
            ['rgb(17, 34, 51)', { r: 17, g: 34, b: 51, a: 1 }],
            ['rgb(221, 102, 170)', { r: 221, g: 102, b: 170, a: 1 }],
            ['rgb(255, 255, 255)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgb(300, 300, 300)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgb(-300, -300, -300)', { r: 0, g: 0, b: 0, a: 1 }],
            ['rgb(-300, 300, -300)', { r: 0, g: 255, b: 0, a: 1 }],
            ['rgb(17.123, 34%, 51)', { r: 17.123, g: 86.7, b: 51, a: 1 }],
            ['rgb(0.001, 102, 70.123%)', { r: 0.001, g: 102, b: 178.81365000000002, a: 1 }],
        ];
        for (const [input, output] of tests) {
            expect(parseRgb(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "rgba(R G B / A)" correctly', () => {
        expect(parseRgb('rgba(0 0 0 / 0)')).to.deep.equal({ r: 0, g: 0, b: 0, a: 0 });
    });
    it('should parse "rgba(R, G, B, A)" correctly', () => {
        const tests: [string, RGB | null][] = [
            ['rgba(0, 0, 0, 0)', { r: 0, g: 0, b: 0, a: 0 }],
            ['rgba(17, 34, 51, 0.5)', { r: 17, g: 34, b: 51, a: 0.5 }],
            ['rgba(221, 102, 170, 10%)', { r: 221, g: 102, b: 170, a: 0.1 }],
            ['rgba(255, 255, 255, 1)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgba(300, 300, 300, 300)', { r: 255, g: 255, b: 255, a: 1 }],
            ['rgba(-300, -300, -300, -300)', { r: 0, g: 0, b: 0, a: 0 }],
            ['rgba(-300, 300, -300, 300)', { r: 0, g: 255, b: 0, a: 1 }],
            ['rgba(17.123, 34%, 51, 11.111%)', { r: 17.123, g: 86.7, b: 51, a: 0.11111 }],
            ['rgba(0.001, 102, 70.123%, 0.567)', { r: 0.001, g: 102, b: 178.81365000000002, a: 0.567 }],
        ];
        for (const [input, output] of tests) {
            expect(parseRgb(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseHsl', () => {
    it('should parse "hsl(H S L)" correctly', () => {
        const tests: [string, HSL | null][] = [
            ['hsl(0 0% 0%)', { h: 0, s: 0, l: 0, a: 1 }],
            ['hsl(90 50% 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(90deg 50% 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            [`hsl(${Math.PI / 2}rad 50% 50%)`, { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(100grad 50% 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(0.25turn 50% 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(-90 -50% -50%)', { h: 0.75, s: 0, l: 0, a: 1 }],
            ['hsl(-540 -150% -150%)', { h: 0.5, s: 0, l: 0, a: 1 }],
            ['hsl(540 150% 150%)', { h: 0.5, s: 1, l: 1, a: 1 }],
            ['hsl(0.1turn 0.1% 99.8%)', { h: 0.1, s: 0.001, l: 0.998, a: 1 }],
            ['hsl(0.1turn 1 99.99%)', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHsl(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "hsl(H, S, L)" correctly', () => {
        const tests: [string, HSL | null][] = [
            ['hsl(0, 0%, 0%)', { h: 0, s: 0, l: 0, a: 1 }],
            ['hsl(90, 50%, 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(90deg, 50%, 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            [`hsl(${Math.PI / 2}rad, 50%, 50%)`, { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(100grad, 50%, 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(0.25turn, 50%, 50%)', { h: 0.25, s: 0.5, l: 0.5, a: 1 }],
            ['hsl(-90, -50%, -50%)', { h: 0.75, s: 0, l: 0, a: 1 }],
            ['hsl(-540, -150%, -150%)', { h: 0.5, s: 0, l: 0, a: 1 }],
            ['hsl(540, 150%, 150%)', { h: 0.5, s: 1, l: 1, a: 1 }],
            ['hsl(0.1turn, 0.1%, 99.8%)', { h: 0.1, s: 0.001, l: 0.998, a: 1 }],
            ['hsl(0.1turn, 1, 99.99%)', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHsl(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "hsla(H S L / A)" correctly', () => {
        const tests: [string, HSL | null][] = [
            ['hsla(0 0% 0% / 0)', { h: 0, s: 0, l: 0, a: 0 }],
            ['hsla(90 50% 50% / 0%)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            ['hsla(90deg 50% 50% / 00%)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            [`hsla(${Math.PI / 2}rad 50% 50% / 0.5)`, { h: 0.25, s: 0.5, l: 0.5, a: 0.5 }],
            ['hsla(100grad 50% 50% / 0.5%)', { h: 0.25, s: 0.5, l: 0.5, a: 0.005 }],
            ['hsla(0.25turn 50% 50% / -1)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            ['hsla(-90 -50% -50% / -0)', { h: 0.75, s: 0, l: 0, a: 0 }],
            ['hsla(-540 -150% -150% / -2)', { h: 0.5, s: 0, l: 0, a: 0 }],
            ['hsla(540 150% 150% / 2)', { h: 0.5, s: 1, l: 1, a: 1 }],
            ['hsla(0.1turn 0.1% 99.8% / -200%)', { h: 0.1, s: 0.001, l: 0.998, a: 0 }],
            ['hsla(0.1turn 1 99.99% / -1%)', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHsl(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
    it('should parse "hsla(H, S, L, A)" correctly', () => {
        const tests: [string, HSL | null][] = [
            ['hsla(0, 0%, 0%, 0)', { h: 0, s: 0, l: 0, a: 0 }],
            ['hsla(90, 50%, 50%, 0%)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            ['hsla(90deg, 50%, 50%, 00%)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            [`hsla(${Math.PI / 2}rad, 50%, 50%, 0.5)`, { h: 0.25, s: 0.5, l: 0.5, a: 0.5 }],
            ['hsla(100grad, 50%, 50%, 0.5%)', { h: 0.25, s: 0.5, l: 0.5, a: 0.005 }],
            ['hsla(0.25turn, 50%, 50%, -1)', { h: 0.25, s: 0.5, l: 0.5, a: 0 }],
            ['hsla(-90, -50%, -50%, -0)', { h: 0.75, s: 0, l: 0, a: 0 }],
            ['hsla(-540, -150%, -150%, -2)', { h: 0.5, s: 0, l: 0, a: 0 }],
            ['hsla(540, 150%, 150%, 2)', { h: 0.5, s: 1, l: 1, a: 1 }],
            ['hsla(0.1turn, 0.1%, 99.8%, -200%)', { h: 0.1, s: 0.001, l: 0.998, a: 0 }],
            ['hsla(0.1turn, 1, 99.99%, -1%)', null],
        ];
        for (const [input, output] of tests) {
            expect(parseHsl(input)).to.deep.equal(output, `for input ${input}`);
        }
    });
});

describe('parseCssToRgb', () => {
    it('should parse "rgb(R G B)" correctly', () => {
        expect(parseCssToRgb('rgb(0 0 0)')).to.deep.equal({ r: 0, g: 0, b: 0, a: 1 });
    });
    it('should parse "rgb(R, G, B)" correctly', () => {
        expect(parseCssToRgb('rgb(0, 0, 0)')).to.deep.equal({ r: 0, g: 0, b: 0, a: 1 });
    });
    it('should parse "rgba(R G B / A)" correctly', () => {
        expect(parseCssToRgb('rgba(0 0 0 / 0)')).to.deep.equal({ r: 0, g: 0, b: 0, a: 0 });
    });
    it('should parse "rgba(R, G, B, A)" correctly', () => {
        expect(parseCssToRgb('rgba(0, 0, 0, 0)')).to.deep.equal({ r: 0, g: 0, b: 0, a: 0 });
    });
});

describe('parseCssToHsl', () => {
    it('should parse "hsl(H S L)" correctly', () => {
        expect(parseCssToHsl('hsl(0 0% 0%)')).to.deep.equal({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('should parse "hsl(H, S, L)" correctly', () => {
        expect(parseCssToHsl('hsl(0, 0%, 0%)')).to.deep.equal({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('should parse "hsla(H S L / A)" correctly', () => {
        expect(parseCssToHsl('hsla(0 0% 0% / 0)')).to.deep.equal({ h: 0, s: 0, l: 0, a: 0 });
    });
    it('should parse "hsla(H, S, L, A)" correctly', () => {
        expect(parseCssToHsl('hsla(0, 0%, 0%, 0)')).to.deep.equal({ h: 0, s: 0, l: 0, a: 0 });
    });
});
