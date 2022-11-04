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
  WELCOME = 0x010000,
  CREDITS = 0x010100,
  INSTRUCTIONS = 0x010200,
  SCORE = 0x010300,
  BEGIN = 0x010400,
  DEATH = 0x010001,
  SUN = 0x010101,
  RAIN = 0x010201,
  WIND = 0x010301,
  SNOW = 0x010401,
  SWAMP = 0x010002,
  CLIFF = 0x010102,
  MOUNTAIN = 0x010202,
  NIGHT = 0x010302,
  CAVE = 0x010402,
  BRIDGE = 0x010003,
  GARDEN = 0x010103,
  FEAST = 0x010203,
  SKINWALKER = 0x010303,
  TRAP = 0x010403,
  TRADE = 0x010004,
  RAPID = 0x010104,

  // Spritesheet #2 (NPCs)
  ELDERBERRY = 0x020000,
  POKEWEED = 0x020100,
  CHAYOTE = 0x020200,
  BEAR_CORN = 0x020300,
  PASSIONFLOWER = 0x020400,
  YAUPON_HOLLY = 0x020500,
  FOXGLOVE = 0x020600,
  CASTOR_BEAN = 0x020700,
  SWAMP_SUMAC = 0x020800,
  COYOTL = 0x020900,
  RAVEN = 0x020a00,
  CARDINAL = 0x020001,
  PECCARY = 0x020101,
  TADPOLE = 0x020201,
  CHESTNUT = 0x020301,
  CATALPA = 0x020401,
  REDBUD = 0x020501,
  OTTER = 0x020601,
  RABBIT = 0x020701,
  DEER = 0x020801,
  MEDICINE_MAN_GUARANI = 0x020901,
  MEDICINE_MAN_MUSKOGEE = 0x020a01,
  THREE_SISTERS = 0x020002,
  BEAR = 0x020102,
  WOLF = 0x020202,
  EAGLE = 0x020302,
  WHALE = 0x020402,
  CRAB = 0x020502,
  RACCOON = 0x020602,
  BLUEJAY = 0x020702,
  SNAKE = 0x020802,
  TURKEY = 0x020902,
  ELK = 0x020a02,
  LLAMA = 0x020003,
  AXOLOTL = 0x020103,
  BISON = 0x020203,
  CAPYBARA = 0x020303,
  SEA_TURTLE = 0x020403,
  DOLPHIN = 0x020503,
  JAGUAR = 0x020603,
  BUTTERFLY = 0x020703,
  CROW = 0x020803,
  QUETZAL = 0x020903,
  XOLOITZCUINTLE = 0x020a03,
  CONDOR = 0x020004,
  MOLE = 0x020104,
  FOX = 0x020204,
  OWL = 0x020304,
  COQUI = 0x020404,
  GUINEA_PIG = 0x020504,
  POSSUM = 0x020604,

  // Spritesheet #3 (heroes)
  SWORD_HOLDER = 0x030000,
  FROST_WOMAN = 0x030100,
  RUNNER = 0x030200,
  HERO_4 = 0x030300,
  EAGLE_KNIGHT = 0x030400,
  CHILLY_ELDER = 0x030500,
  SERPENT_PRIESTESS = 0x030600,
  HERO_8 = 0x030001,
  HERO_9 = 0x030101,
  CORN_WOMAN = 0x030201,
  SQUASH_LADY = 0x030301,
  BEAN_GIRL = 0x030401,
  MINDIMOOYENH = 0x030501,
  BRAWLER = 0x030601,
  POTTER = 0x030002,
  HERO_16 = 0x030102,
  BIRD_CATCHER = 0x030202,
  HERO_18 = 0x030302,
  HERO_19 = 0x030402,
  HERO_20 = 0x030502,
  HERO_21 = 0x030602,
  HERO_22 = 0x030003,
  HERO_23 = 0x030103,
  HERO_24 = 0x030203,
  HERO_25 = 0x030303,
  HERO_26 = 0x030403,
  HERO_27 = 0x030503,
  BEAD_QUEEN = 0x030603,

  // Spritesheet #4 (Items)
  CORN = 0x040000,
  SQUASH = 0x040100,
  BEANS = 0x040200,
  TURQUOISE_BEAD = 0x040300,
  PIGEON_FEATHER = 0x040400,
  GROUND_CHERRY = 0x040500,
  ACORN = 0x040600,
  INDIAN_GRASS = 0x040700,
  WOOL_BLANKET = 0x040800,
  CRANBERRY = 0x040900,
  AMARANTH = 0x040a00,
  SUNCHOKE = 0x040b00,
  GROUNDNUT = 0x040c00,
  PONCHO = 0x040d00,
  COPPER_AXE = 0x040e00,
  QUIPU = 0x040001,
  MOCCASINS = 0x040101,
  CARDINAL_FEATHER = 0x040201,
  MEDICINE_BAG = 0x040301,
  TOBACCO = 0x040401,
  FRY_BREAD = 0x040501,
  SACK_OF_GOLD = 0x040601,
  SACK_OF_SILVER = 0x040701,
  PAW_PAW = 0x040801,
  CASSAVA = 0x040901,
  SUNFLOWER = 0x040a01,
  CROWBERRY = 0x040b01,
  DREAM_CATCHER = 0x040c01,
  SERPENTINE_ARMBANDS = 0x040d01,
  TURKEY_HEADDRESS = 0x040e01,
  DEERSKIN_BOOTS = 0x040002,
  JADE_DAGGER = 0x040102,
  SUNGLASSES = 0x040202,
  GUANIN_AMULET = 0x040302,
  ECHINACEA = 0x040402,
  FROG_GLYPH = 0x040502,
  STORM_GLYPH = 0x040602,
  SUN_GLYPH = 0x040702,
  BIRD_GLYPH = 0x040802,
  BAG_OF_SALMON = 0x040902,
  DRINKING_GOURD = 0x040a02,
  SUCCOTASH = 0x040b02,
  BLUEJAY_FEATHER = 0x040c02,
  MACUAHUITL = 0x040d02,
  AMOXTLI = 0x040e02,
  HUARACHE = 0x040003,
  RATTLE_GOURD = 0x040103,
  LYNX_CAPE = 0x040203,
  RACOON_CAPE = 0x040303,
  DEERSKIN_CAPE = 0x040403,
  BOW_AND_ARROW = 0x040503,
  JUNGLE_MANUAL = 0x040603,
  FLOWERING_SASH = 0x040703,
  BISON_TOTEM = 0x040803,
  TURTLE_TOTEM = 0x040903,
  EAGLE_TOTEM = 0x040a03,
  CORN_AND_BEAN_SOUP = 0x040b03,
  OBSIDIAN_COLLAR = 0x040c03,
  EAGLE_FEATHER = 0x040d03,
  CONDOR_FEATHER = 0x040e03,
  QUETZAL_FEATHER = 0x040004,
  HUMMINGBIRD_FEATHER = 0x040104,
  CONDORS_CLEAVER = 0x040204,
  QUETZALS_QUIVER = 0x040304,
  EAGLES_AEGIS = 0x040404,
  GOLDEN_MIRROR = 0x040504,
  PINE_NEEDLE_TEA = 0x040604,
  JADE_COLLAR = 0x040704,
  TURQUOISE_MASK = 0x040804,
  JADE_MASK = 0x040904,
  GOLD_MASK = 0x040a04,
  PEMMICAN = 0x040b04,
  TURQUOISE_RING = 0x040c04,
  MEDICINE_WHEEL = 0x040d04,
  SPIRIT_RATTLE = 0x040e04,

  // Constants that are special
  NONE = 0xfffffe,
  LOADING = 0xffffff
}

export default Sprites;
