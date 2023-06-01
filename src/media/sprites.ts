/**
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
  LINE_HORT = 0x000902,
  ARROW_LEFT = 0x000a02,
  ARROW_RIGHT = 0x000b02,
  COLON = 0x000c02,
  ACCENT_I = 0x000d02,
  ACCENT_E = 0x000e02,
  PAREN_OPEN = 0x000f02,
  PAREN_CLOSE = 0x001002,

  // Spritesheet #1 (backgrounds) (10 x 5)
  WELCOME = 0x010000,
  CREDITS = 0x010100,
  INSTRUCTIONS = 0x010200,
  SCORE = 0x010300,
  BEGIN = 0x010400,
  DEATH = 0x010500,
  NIGHT = 0x010600,
  SUN = 0x010700,
  RAIN = 0x010800,
  WIND = 0x010900,
  SNOW = 0x010001,
  BABY_PECCARY = 0x010101,
  BEAR = 0x010201,
  RACCOON = 0x010301,
  CLIFF = 0x010401,
  BUTTERFLY = 0x010501,
  PASSIONFLOWER = 0x010601,
  POKEWEED = 0x010701,
  CASTOR_BEAN = 0x010801,
  GARDEN = 0x010901,
  RIVER = 0x010002,
  TRADING_POST = 0x010102,
  COYOTL = 0x010202,
  RABBIT = 0x010302,
  CAVE = 0x010402,
  MEDICINE_MAN = 0x010502,
  YAUPON_HOLLY = 0x010602,
  RAVEN = 0x010702,
  THREE_SISTERS = 0x010802,
  SKINWALKER = 0x010902,
  DEER = 0x010003,
  VILLAGE = 0x010103,
  BRIDGE = 0x010203,
  SEED = 0x010303,
  EGG = 0x010403,
  BADGER = 0x010503,
  SUNRISE = 0x010603,
  CACTUS = 0x010703,
  PUMA = 0x010803,
  MENTOR = 0x010903,
  AXOLOTL = 0x010004,
  STORM = 0x010104,
  ILLNESS = 0x010204,
  MERCHANT = 0x010304,
  TURTLE = 0x010404,
  BUTTERFLY_FIELD = 0x010504,
  WATERFALL = 0x010604,
  PRAIRIE = 0x010704,
  EAGLE = 0x010804,
  OWL = 0x010904,

  // Spritesheet #2 (heroes) (5 x 4)
  CORN_WOMAN = 0x020000,
  SQUASH_LADY = 0x020100,
  BEAN_GIRL = 0x020200,
  MINDIMOOYENH = 0x020300,
  GUECHA = 0x020400,
  BIRD_CATCHER = 0x020001,
  BEAD_QUEEN = 0x020101,
  HIGHLANDER = 0x020201,
  GUARDIAN = 0x020301,
  EAGLE_KNIGHT = 0x020401,
  MEDICINE_WOMAN = 0x020002,
  KAMAYUQ = 0x020102,
  GOURD_ELDER = 0x020202,
  HOOP_DANCER = 0x020302,
  SWORD_HOLDER = 0x020402,
  TRACKER = 0x020003,
  RUNNER = 0x020103,
  WANDERER = 0x020203,
  MOON_PRIESTESS = 0x020303,
  FISHERMAN = 0x020403,

  // Spritesheet #3 (Items) (10 x 4)
  CORN = 0x030000,
  SQUASH = 0x030100,
  BEANS = 0x030200,
  TURQUOISE_BEAD = 0x030300,
  GOLD_BEAD = 0x030400,
  SILVER_BEAD = 0x030500,
  BAD_MEDICINE = 0x030600,
  GOLD_RING = 0x030700,
  CORN_SOUP = 0x030800,
  JADE_AMULET = 0x030900,
  SQUASH_SOUP = 0x030001,
  BEADED_MOCCASINS = 0x030101,
  BEAN_SOUP = 0x030201,
  GOURD_BOTTLE = 0x030301,
  GOLD_BRACELET = 0x030401,
  SILVER_BRACELET = 0x030501,
  CURSED_RING = 0x030601,
  CURSED_AMULET = 0x030701,
  CURSED_SANDALS = 0x030801,
  MACUAHUITL = 0x030901,
  QUIPU = 0x030002,
  MOGOLLON = 0x030102,
  MEDICINE_BAG = 0x030202,
  PEMMICAN = 0x030302,
  SUNFLOWER = 0x030402,
  PAW_PAW = 0x030502,
  PITAYA = 0x030602,
  CROWBERRIES = 0x030702,
  PASSIONFLOWER_TEA = 0x030802,
  CONDOR_FEATHER = 0x030902,
  OWL_FEATHER = 0x030003,
  FALCON_FEATHER = 0x030103,
  SUCCOTASH = 0x030203,
  EAGLE_FEATHER = 0x030303,
  GOLDEN_MIRROR = 0x030403,
  DEER_TOTEM = 0x030503,
  BUFFALO_TOTEM = 0x030603,
  TURTLE_TOTEM = 0x030703,
  COYOTL_TOTEM = 0x030803,
  TURQUOISE_RING = 0x030903,

  // Constants that are special
  NONE = 0xfffffe,
  LOADING = 0xffffff
}

export default Sprites;
