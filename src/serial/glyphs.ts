import Sprites from '../enums/sprites';

export default class Glyphs {

  /*
   * This method returns true if the text contains no invalid characters
   */
  static isValid(text: string): boolean {
    try {
      for (const c of text) {
        if (['\n', ' '].indexOf(c) < 0) {
          Glyphs.getGlyph(c);
        }
      }
    } catch (err) {
      return false;
    }
    return true;
  }

  /*
   * This method returns a sprite for a specific character.
   */
  static getGlyph(char: string): Sprites {
    const a = 'a'.charCodeAt(0);
    const z = 'z'.charCodeAt(0);
    const zero = '0'.charCodeAt(0);
    const nine = '9'.charCodeAt(0);
    const code = char.charCodeAt(0);
    if (code >= a && code <= z) {
      return ((Sprites.A as number) + ((code - a) << 8)) as Sprites;
    }
    if (code >= zero && code <= nine) {
      return ((Sprites.ZERO as number) + ((code - zero) << 8)) as Sprites;
    }
    switch (char) {
      case 'í': return Sprites.I;
      case 'é': return Sprites.E;
      case '.': return Sprites.PERIOD;
      case ',': return Sprites.COMMA;
      case '!': return Sprites.EXCLAIM;
      case '?': return Sprites.QUESTION;
      case '+': return Sprites.PLUS;
      case '-': return Sprites.MINUS;
      case '\'': return Sprites.APOSTROPHE;
      case '/': return Sprites.SLASH;
      case '%': return Sprites.PERCENT;
      case ':': return Sprites.COLON;
    }
    throw new Error(`No font glyph for character '${char}'`);
  }
}