import { HSL, RGB } from './index';
export declare function parseColourChannelString(channel: string): number;
export declare function parseAlphaChannelString(channel: string): number;
export declare function parseAngle(angle: string, unit?: string): number;
export declare function parseHex(css: string): RGB;
export declare function parseRgb(css: string): RGB;
export declare function parseHsl(css: string): HSL;
export declare function parseCssToRgb(css: string): RGB;
export declare function parseCssToHsl(css: string): HSL;
