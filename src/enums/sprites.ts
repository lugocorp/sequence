/*
 * This enum contains all the sprites used in the game.
 */
enum Sprites {

  // Spritesheet #0 (font)
  A = 0x000000,
  B = 0x000100,
  C = 0x000200,
  D = 0x000300,
  E = 0x000400,
  F = 0x000500,
  G = 0x000600,
  H = 0x000700,
  I = 0x000800,
  J = 0x000900,
  K = 0x000A00,
  L = 0x000B00,
  M = 0x000C00,
  N = 0x000D00,
  O = 0x000E00,
  P = 0x000F00,
  Q = 0x001000,
  R = 0x001100,
  S = 0x001200,
  T = 0x001300,
  U = 0x001400,
  V = 0x001500,
  W = 0x001600,
  X = 0x001700,
  Y = 0x001800,
  Z = 0x001900,
  ZERO        = 0x000001,
  ONE         = 0x000101,
  TWO         = 0x000201,
  THREE       = 0x000301,
  FOUR        = 0x000401,
  FIVE        = 0x000501,
  SIX         = 0x000601,
  SEVEN       = 0x000701,
  EIGHT       = 0x000801,
  NINE        = 0x000901,
  PERIOD      = 0x000002,
  COMMA       = 0x000102,
  EXCLAIM     = 0x000202,
  QUESTION    = 0x000302,
  PLUS        = 0x000402,
  MINUS       = 0x000502,
  APOSTROPHE  = 0x000602,
  SLASH       = 0x000702,
  PERCENT     = 0x000802,
  LINE_VERT   = 0x000902,
  LINE_HORT   = 0x000A02,
  TOP_LEFT    = 0x000B02,
  TOP_RIGHT   = 0x000C02,
  BOT_LEFT    = 0x000D02,
  BOT_RIGHT   = 0x000E02,
  ARROW_LEFT  = 0x000F02,
  ARROW_RIGHT = 0x001002,
  COLON       = 0x001102,

  // Spritesheet #1 (backgrounds)
  WELCOME      = 0x010000, // Come up with these later
  INSTRUCTIONS = 0x010000, // Come up with these later
  CREDITS      = 0x010000, // Come up with these later
  BEGIN        = 0x010000, // Come up with these later
  DEATH        = 0x010000, // Come up with these later
  OBSTACLE     = 0x010000, // Come up with these later
  GIFT         = 0x010000, // Come up with these later
  TRAP         = 0x010000, // Come up with these later
  NIGHT        = 0x010000, // Come up with these later
  DAY          = 0x010000, // Come up with these later
  SUN          = 0x010000, // Come up with these later
  RAIN         = 0x010000, // Come up with these later
  WIND         = 0x010000, // Come up with these later
  TRADE        = 0x010000, // Come up with these later
  PROJECT      = 0x010000, // Come up with these later
  RAPID        = 0x010000, // Come up with these later
  PLANT1       = 0x010000, // Come up with these later
  PLANT2       = 0x010000, // Come up with these later
  PLANT3       = 0x010000, // Come up with these later
  ANIMAL1      = 0x010000, // Come up with these later
  ANIMAL2      = 0x010000, // Come up with these later
  ANIMAL3      = 0x010000, // Come up with these later

  // Spritesheet #2 (enemies)
  SPIRIT            = 0x020000, // Placeholder to be replaced later
  TREASURE_CHEST    = 0x020000,
  TOOTH_BEAST       = 0x020100,
  MATRIARCH         = 0x020200,
  TOXIC_SLUDGE      = 0x020001,
  DIRE_CRAB         = 0x020101,
  SWORD_HOLDER      = 0x020201,

  // Constants that are special
  NONE    = 0xFFFFFE,
  LOADING = 0xFFFFFF
}

export default Sprites;