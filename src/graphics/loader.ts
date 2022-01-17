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
   * This method returns the dimensions of each sprite in a spritesheet
   * identified by the sheet parameter.
   */
  getDimensions(sheet: number): [number, number] {
    switch (sheet) {
      case 0: return [5, 8];
      case 1: return [10, 10];
      case 2: return [60, 60];
    }
    throw new Error(`No dimensions set for spritesheet #${sheet}`);
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
    const dimensions: [number, number] = this.getDimensions(index);
    if (index >= GraphicsLoader.NUM_SHEETS) {
      throw new Error(`Spritesheet #${index} not registered`);
    }
    return {
      src: this.sheets[index],
      left: x * dimensions[0],
      top: y * dimensions[1],
      width: dimensions[0],
      height: dimensions[1]
    };
  }
}