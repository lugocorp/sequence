/*
 * This class handles loading graphical assets to be displayed in the game.
 * It loads assets by a 3-byte hexadecimal, where the first byte refers to
 * a spritesheet ID, and the second and third bytes are coordinates.
 */
import DrawCoords from './draw-coords';

export default class GraphicsLoader {
  sheets: HTMLImageElement[] = [];
  specs: [number, number][] = [
    [80, 80]
  ];

  /*
   * Loads every spritesheet so we can grab sprites from them later.
   * This is an async method that resolves only when every spritesheet
   * has been fully loaded.
   */
  async loadAssets(): Promise<void> {
    await Promise.all(this.specs.map((spec: [number, number], index: number) => {
      this.sheets[index] = new Image();
      return new Promise((resolve) => {
        this.sheets[index].src = `./assets/sheet${index}.png`;
        this.sheets[index].onload = resolve;
      });
    }));
  }

  /*
   * Returns draw instructions for a sprite based on a 3-byte hexadecimal.
   * The draw instructions include the sprite's source sheet, as well as
   * x, y, width and height coordinates on that sheet to pull from.
   */
  getSprite(id: number): DrawCoords {
    const index: number = id >> 16;
    const x = (id - (index << 16)) >> 8;
    const y = (id - (index << 16)) - (x << 8);
    return {
      src: this.sheets[index],
      left: x * 80,
      top: y * 80,
      width: 80,
      height: 80
    };
  }
}