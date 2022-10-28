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
  K = 0x000a00,
  L = 0x000b00,
  M = 0x000c00,
  N = 0x000d00,
  O = 0x000e00,
  P = 0x000f00,
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
  ZERO = 0x000001,
  ONE = 0x000101,
  TWO = 0x000201,
  THREE = 0x000301,
  FOUR = 0x000401,
  FIVE = 0x000501,
  SIX = 0x000601,
  SEVEN = 0x000701,
  EIGHT = 0x000801,
  NINE = 0x000901,
  PERIOD = 0x000002,
  COMMA = 0x000102,
  EXCLAIM = 0x000202,
  QUESTION = 0x000302,
  PLUS = 0x000402,
  MINUS = 0x000502,
  APOSTROPHE = 0x000602,
  SLASH = 0x000702,
  PERCENT = 0x000802,
  LINE_VERT = 0x000902,
  LINE_HORT = 0x000a02,
  TOP_LEFT = 0x000b02,
  TOP_RIGHT = 0x000c02,
  BOT_LEFT = 0x000d02,
  BOT_RIGHT = 0x000e02,
  ARROW_LEFT = 0x000f02,
  ARROW_RIGHT = 0x001002,
  COLON = 0x001102,
  ACCENT_I = 0x001202,
  ACCENT_E = 0x001302,
  PAREN_OPEN = 0x001402,
  PAREN_CLOSE = 0x001502,

  // Spritesheet #1 (backgrounds)
  WELCOME = 0x010203,
  INSTRUCTIONS = 0x010103,
  CREDITS = 0x010003,
  BEGIN = 0x010301,
  DEATH = 0x010302,
  OBSTACLE = 0x010300,
  TRAP = 0x010303,
  SUN = 0x010100,
  RAIN = 0x010200,
  WIND = 0x010001,
  SNOW = 0x010000,
  TRADE = 0x010101,
  RAPID = 0x010201,
  PROJECT = 0x010002,
  DAY = 0x010102,
  NIGHT = 0x010202,

  // Spritesheet #2 (plants/animals)
  ELDERBERRY = 0x020000,
  POKEWEED = 0x020100,
  CHAYOTE = 0x020200,
  CARDINAL = 0x020001,
  RACCOON = 0x020101,
  COYOTL = 0x020201,

  // Spritesheet #3 (challengers)
  OWL = 0x030000,
  AXOLOTL = 0x030100,
  BUTTERFLY = 0x030200,
  BEAR = 0x030300,

  // Spritesheet #4 (heroes)
  BIRD_CATCHER = 0x040000,
  POTTER = 0x040100,
  GOURD_ELDER = 0x040200,
  CORN_WOMAN = 0x040300,
  SQUASH_LADY = 0x040400,
  BEAN_GIRL = 0x040001,
  SWORD_HOLDER = 0x040101,
  DEER_HUNTER = 0x040201,
  SCOUT = 0x040301,
  RUNNER = 0x040401,
  COUNSELOR = 0x040002,
  SUN_PRIEST = 0x040102,
  BEAD_QUEEN = 0x040202,
  BONE_CRUSHER = 0x040302,
  FOX_BOY = 0x040402,
  NIGHT_SKY_WOMAN = 0x040003,
  CHINAMPA_MAN = 0x040103,
  CHILLY_ELDER = 0x040203,
  BASKETWEAVER = 0x040303,
  BRAWLER = 0x040403,
  SNEAKY_HUNTER = 0x040004,
  WAR_RIDER = 0x040104,
  SNEAKY_DANCER = 0x040204,
  MERCHANT = 0x040304,
  RANGER = 0x040404,

  // Spritesheet #5 (Items)
  CORN = 0x050000,
  SQUASH = 0x050100,
  BEANS = 0x050200,
  FEATHER = 0x050300,
  TURQUOISE = 0x050400,
  MACUAHUITL = 0x050001,
  QUIPU = 0x050101,
  MOCCASIN = 0x050201,
  MEDICINE_BAG = 0x050301,
  TOBACCO = 0x050401,
  ECHINACEA = 0x050002,
  PAW_PAW = 0x050102,
  CASSAVA = 0x050202,
  SUNFLOWER = 0x050302,
  MANOOMIN_RICE = 0x050402,
  SUCCOTASH = 0x050003,
  CHICHA = 0x050103,
  EAGLE_FEATHER = 0x050203,
  TURQUOISE_RING = 0x050303,

  // Spritesheet #6 (backgrounds)
  SPIRIT_REALM = 0x060000,
  PRAIRIE = 0x060100,

  // Constants that are special
  NONE = 0xfffffe,
  LOADING = 0xffffff
}

export default Sprites;
