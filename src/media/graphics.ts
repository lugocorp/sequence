import { WGLYPH, HGLYPH } from '../types';
import Game from '../game';

export default abstract class Graphics {
  static NUM_SHEETS = 4;
  scale: number;
  dark: number;

  abstract setup(): void;
  abstract setSize(): void;
  abstract frame(game: Game): void;
  abstract loadInitialAsset(): Promise<void>;
  abstract loadAssets(): Promise<void>;

  // Converts text coords to display coords
  toDisplayCoords(tx: number, ty: number): [number, number] {
    return [ tx * WGLYPH + 2, ty * HGLYPH + 104 ];
  }

  // Returns the bounds of some text
  getTextBounds(msg: string): [number, number] {
    const lines: string[] = msg.split('\n');
    if (!lines[lines.length - 1].length) {
      lines.pop();
    }
    return [
      lines.reduce((acc: number, x: string) => Math.max(acc, x.length), 0) * WGLYPH,
      lines.length * HGLYPH
    ];
  }
}
