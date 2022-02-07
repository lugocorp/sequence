/*
 * This class handles loading graphical assets to be displayed in the game.
 * It loads assets by a 3-byte hexadecimal, where the first byte refers to
 * a spritesheet ID, and the second and third bytes are coordinates.
 */
import DrawCoords from './draw-coords';

export default class GraphicsLoader {
  sheets: HTMLImageElement[];
  static NUM_SHEETS = 3;

  /*
   * This method returns the dimensions of each sprite in a spritesheet
   * identified by the sheet parameter.
   */
  getDimensions(sheet: number): {w: number, h: number} {
    const sizes = [
      {w: 5, h: 8},
      {w: 10, h: 10}
    ];
    return (sheet < sizes.length) ? sizes[sheet] : {w: 60, h: 60};
  }

  /*
   * Loads every spritesheet so we can grab sprites from them later.
   * This is an async method that resolves only when every spritesheet
   * has been fully loaded.
   */
  async loadAssets(): Promise<void> {
    this.sheets = [];
    for (let index = 0; index < GraphicsLoader.NUM_SHEETS; index++) {
      this.sheets.push(new Image());
      await new Promise((resolve) => {
        this.sheets[index].src = `./assets/sheet${index}.png`;
        this.sheets[index].onload = resolve;
      });
    }
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
    const dimensions: {w: number, h: number} = this.getDimensions(index);
    if (index >= GraphicsLoader.NUM_SHEETS) {
      throw new Error(`Spritesheet #${index} not registered`);
    }
    return {
      src: this.sheets[index],
      left: x * dimensions.w,
      top: y * dimensions.h,
      width: dimensions.w,
      height: dimensions.h
    };
  }
}