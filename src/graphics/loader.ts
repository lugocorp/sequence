/*
 * This class handles loading graphical assets to be displayed in the game.
 * It loads assets by a 3-byte hexadecimal, where the first byte refers to
 * a spritesheet ID, and the second and third bytes are coordinates.
 */

export default class GraphicsLoader {
    placeholder: HTMLImageElement;

    // Loads every spritesheet so we can grab sprites from them later
    async loadAssets(): Promise<void> {
        this.placeholder = new Image();
        await new Promise((resolve) => {
            this.placeholder.src = './assets/placeholder.jpeg';
            this.placeholder.onload = resolve;
        });
    }

    // Grabs a sprite from a spritesheet based on a 3-byte hexadecimal
    getSprite(id: number): HTMLImageElement {
        const sheet: number = id >> 16;
        const x = (id - sheet << 16) >> 8;
        const y = (id - sheet << 16) - x << 8;
        console.log(`Grab sprite from sheet ${sheet}, coords (${x}, ${y})`);
        return this.placeholder;
    }
}