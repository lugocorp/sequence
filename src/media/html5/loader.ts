/*
 * This class handles loading graphical assets to be displayed in the game.
 * It loads assets by a 3-byte hexadecimal, where the first byte refers to
 * a spritesheet ID, and the second and third bytes are coordinates.
 */
import { WGLYPH, HGLYPH } from '../../types';
import Graphics from '../graphics';
import Sprites from '../sprites';

export interface DrawCoords {
    src: HTMLImageElement;
    left: number;
    top: number;
    width: number;
    height: number;
}

export class HTML5GraphicsLoader {
    private loadAsset: HTMLImageElement;
    private sheets: HTMLImageElement[];

    /*
     * This method returns the dimensions of each sprite in a spritesheet
     * identified by the sheet parameter.
     */
    getDimensions(sheet: number): { w: number; h: number } {
        if (sheet === 0) {
            return { w: WGLYPH, h: HGLYPH };
        }
        return { w: 100, h: 100 };
    }

    /*
     * Loads the one sprite needed for the loading screen.
     */
    async loadInitialAsset(): Promise<void> {
        this.loadAsset = new Image();
        await new Promise((resolve) => {
            this.loadAsset.src = `./assets/loading.png`;
            this.loadAsset.onload = resolve;
        });
    }

    /*
     * Loads every spritesheet so we can grab sprites from them later.
     * This is an async method that resolves only when every spritesheet
     * has been fully loaded.
     */
    async loadAssets(): Promise<void> {
        this.sheets = [];
        for (let index = 0; index < Graphics.NUM_SHEETS; index++) {
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
        if (id === Sprites.LOADING) {
            return {
                src: this.loadAsset,
                left: 0,
                top: 0,
                width: 50,
                height: HGLYPH
            };
        }
        if (id === Sprites.NONE) {
            return {
                src: undefined,
                left: 0,
                top: 0,
                width: 100,
                height: 100
            };
        }
        const index: number = id >> 16;
        const x = (id - (index << 16)) >> 8;
        const y = id - (index << 16) - (x << 8);
        const dimensions: { w: number; h: number } = this.getDimensions(index);
        if (index >= Graphics.NUM_SHEETS) {
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
