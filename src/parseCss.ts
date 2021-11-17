import { HSL, hslToRgb, RGB, rgbToHsl } from './index';

export function parseColourChannelString(channel: string): number {
    let value = parseFloat(channel);
    if (isNaN(value)) {
        throw new Error(`Invalid channel string: ${channel}`);
    }
    if (channel.endsWith('%')) {
        value = 255 * value / 100;
    }
    return Math.max(Math.min(value, 255), 0);
}

export function parseAlphaChannelString(channel: string): number {
    let value = parseFloat(channel);
    if (isNaN(value)) {
        throw new Error(`Invalid channel string: ${channel}`);
    }
    if (channel.endsWith('%')) {
        value = value / 100;
    }
    return Math.max(Math.min(value, 1), 0);
}

export function parseAngle(angle: string, unit = 'deg'): number {
    let value = parseFloat(angle);
    switch (unit) {
        case 'deg':
            value /= 360;
            break;
        case 'rad':
            value /= 2 * Math.PI;
            break;
        case 'grad':
            value /= 400;
            break;
        case 'turn':
            // no action required
            break;
        default:
            // default to deg
            value /= 360;
    }
    value %= 1;
    return Math.abs(value < 0 ? value + 1 : value);
}

export function parseHex(css: string): RGB {
    let match;
    let rString;
    let gString;
    let bString;
    let aString;
    // #RGB[A]
    match = css.match(/^#([A-F\d])([A-F\d])([A-F\d])([A-F\d]?)$/i);
    if (match) {
        const [, r, g, b, a] = match;
        rString = `${r}${r}`;
        gString = `${g}${g}`;
        bString = `${b}${b}`;
        if (a) {
            aString = `${a}${a}`;
        }
    } else {
        // #RRGGBB[AA]
        match = css.match(/^#([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})?$/i);
        if (match) {
            const [, r, g, b, a] = match;
            rString = r;
            gString = g;
            bString = b;
            if (a) {
                aString = a;
            }
        } else {
            throw new Error(`Invalid colour hex format: ${css}`);
        }
    }
    const r = parseInt(rString, 16);
    const g = parseInt(gString, 16);
    const b = parseInt(bString, 16);
    let a = 1;
    if (aString) {
        a = parseInt(aString, 16) / 255;
    }
    return { r, g, b, a };
}

export function parseRgb(css: string): RGB {
    let match;
    // rgb(1,2,3) or rgb(10%,20%,30%)
    match = css.match(/^rgb\((-?[\d.]+%?), *(-?[\d.]+%?), *(-?[\d.]+%?)\)$/);
    if (!match) {
        // rgb(1 2 3) or rgb(10% 20% 30%)
        match = css.match(/^rgb\((-?[\d.]+%?) +(-?[\d.]+%?) +(-?[\d.]+%?)\)$/);
    }
    if (!match) {
        // rgba(1,2,3,0.5) or rgba(10%,20%,30%,50%)
        match = css.match(/^rgba\((-?[\d.]+%?), *(-?[\d.]+%?), *(-?[\d.]+%?), *(-?[\d.]+%?)\)$/);
    }
    if (!match) {
        // rgba(1 2 3 / 0.5) or rgba(10%, 20% 30% / 50%)
        match = css.match(/^rgba\((-?[\d.]+%?) +(-?[\d.]+%?) +(-?[\d.]+%?) *\/ *(-?[\d.]+%?)\)$/);
    }
    if (!match) {
        throw new Error(`Invalid colour rgb function format: ${css}`);
    }
    const [, rString, gString, bString, aString] = match;
    const r = parseColourChannelString(rString);
    const g = parseColourChannelString(gString);
    const b = parseColourChannelString(bString);
    const a = aString ? parseAlphaChannelString(aString) : 1;
    return { r, g, b, a };
}

export function parseHsl(css: string): HSL {
    let match;
    // hsl(1,2%,3%) or hsl(10deg,20%,30%)
    match = css.match(/^hsl\((-?[\d.]+)(deg|rad|grad|turn)?, *(-?[\d.]+%), *(-?[\d.]+%)\)$/);
    if (!match) {
        // hsl(1 2% 3%) or hsl(10rad 20% 30%)
        match = css.match(/^hsl\((-?[\d.]+)(deg|rad|grad|turn)? +(-?[\d.]+%) +(-?[\d.]+%)\)$/);
    }
    if (!match) {
        // hsla(1,2%,3%,0.5) or hsla(10grad,20%,30%,50%)
        match = css.match(/^hsla\((-?[\d.]+)(deg|rad|grad|turn)?, *(-?[\d.]+%), *(-?[\d.]+%), *(-?[\d.]+%?)\)$/);
    }
    if (!match) {
        // hsla(1 2% 3% / 0.5) or hsla(10turn, 20% 30% / 50%)
        match = css.match(/^hsla\((-?[\d.]+)(deg|rad|grad|turn)? +(-?[\d.]+%) +(-?[\d.]+%) *\/ *(-?[\d.]+%?)\)$/);
    }
    if (!match) {
        throw new Error(`Invalid colour hsl function format: ${css}`);
    }
    const [, hString, angleUnit, sString, lString, aString] = match;
    const h = parseAngle(hString, angleUnit);
    const s = parseAlphaChannelString(sString);
    const l = parseAlphaChannelString(lString);
    const a = aString ? parseAlphaChannelString(aString) : 1;
    return { h, s, l, a };
}

export function parseCssToRgb(css: string): RGB {
    switch (true) {
        case /^#/.test(css):
            return parseHex(css);
        case /^rgb/.test(css):
            return parseRgb(css);
        case /^hsl/.test(css):
            return hslToRgb(parseHsl(css));
        default:
            throw new Error(`Invalid colour css format: ${css}`);
    }
}

export function parseCssToHsl(css: string): HSL {
    switch (true) {
        case /^#/.test(css):
            return rgbToHsl(parseHex(css));
        case /^rgb/.test(css):
            return rgbToHsl(parseRgb(css));
        case /^hsl/.test(css):
            return parseHsl(css);
        default:
            throw new Error(`Invalid colour css format: ${css}`);
    }
}
