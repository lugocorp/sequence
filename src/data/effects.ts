import DeerEvent from '../views/events/deer';
import RapidEvent from '../views/events/rapid';
import ObstacleEvent from '../views/events/obstacle';
import ChallengeEvent from '../views/events/challenge';
import { Trigger, TriggerType, Effect } from '../enums/triggers';
import { Weather, Time } from '../enums/world';
import Rarity from '../enums/rarity';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Hero from '../entities/hero';
import Game from '../game';
const data: Record<string, Effect> = {};

data['corn'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength++;
  }
};

data['squash'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom++;
  }
};

data['beans'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity++;
  }
};

data['turquoise bead'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    data.luck += 5;
  }
};

data['pigeon feather'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    data.luck += 10;
  }
  if (data.type === TriggerType.AFTER_LUCK) {
    data.hero.basket.unequip(this);
  }
};

data['ground cherry'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_FATIGUE) {
    data.fatigue = false;
  }
  if (data.type === TriggerType.AFTER_FATIGUE) {
    if (data.hero.basket.contains(this)) {
      data.hero.basket.unequip(this);
    }
  }
};

data['acorn'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    if (this.values.stat === undefined) {
      this.values.stat = Stats.getRandomStat();
    }
    data[Stats.getStatName(this.values.stat)]++;
  }
  if (data.type === TriggerType.AFTER_FATIGUE && Game.game.event.isTypeEvent(ChallengeEvent)) {
    if (data.hero.basket.contains(this)) {
      data.hero.basket.unequip(this);
    }
  }
};

data['indian grass'] = function (data: Trigger) {
  if (Game.game.event.isTypeEvent(RapidEvent)) {
    if (data.type === TriggerType.GET_LUCK) {
      data.luck = 100;
    }
    if (data.type === TriggerType.AFTER_LUCK) {
      data.hero.basket.unequip(this);
    }
  }
};

data['wool blanket'] = function (data: Trigger) {
  if (Game.game.event.isTypeEvent(ObstacleEvent)) {
    if (data.type === TriggerType.GET_OBSTACLE) {
      data.pass = true;
    }
    if (data.type === TriggerType.AFTER_EVENT) {
      this.bearer.basket.unequip(this);
    }
  }
};

data['cranberry'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_FATIGUE) {
    if (this.values.ticks === 0) {
      data.fatigue = false;
    }
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    this.values.ticks = (this.values.ticks || 3) - 1;
  }
};

data['amaranth'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    if (Game.game.event.isTypeEvent(ChallengeEvent) && this.values.ticks === 0) {
      data.strength++;
    }
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    if (this.values.ticks === undefined) {
      this.values.ticks = 0;
    }
    if (Game.game.event.isTypeEvent(ChallengeEvent)) {
      this.values.ticks = (this.values.ticks || 3) - 1;
    }
  }
};

data['sunchoke'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    if (Game.game.event.isTypeEvent(ChallengeEvent) && this.values.ticks === 0) {
      data.wisdom++;
    }
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    if (this.values.ticks === undefined) {
      this.values.ticks = 0;
    }
    if (Game.game.event.isTypeEvent(ChallengeEvent)) {
      this.values.ticks = (this.values.ticks || 3) - 1;
    }
  }
};

data['groundnut'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    if (Game.game.event.isTypeEvent(ChallengeEvent) && this.values.ticks === 0) {
      data.dexterity++;
    }
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    if (this.values.ticks === undefined) {
      this.values.ticks = 0;
    }
    if (Game.game.event.isTypeEvent(ChallengeEvent)) {
      this.values.ticks = (this.values.ticks || 3) - 1;
    }
  }
};

data['poncho'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_OBSTACLE) {
    data.pass = data.pass || Random.passes(0.3);
  }
};

data['copper axe'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
    data.wisdom--;
  }
};

data['quipu'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom += 2;
    data.dexterity--;
  }
};

data['moccasins'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity += 2;
    data.strength--;
  }
};

data['cardinal feather'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    if (!this.values.ticks) {
      data.luck += 15;
    }
  }
  if (data.type === TriggerType.AFTER_LUCK) {
    this.values.ticks = (this.values.ticks || 3) - 1;
  }
};

data['medicine bag'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_LEAVE) {
    for (const hero of Game.game.party.members) {
      hero.boostLuck(5);
    }
  }
};

data['tobacco'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    this.values.primed = true;
  }
  if (data.type === TriggerType.AFTER_FATIGUE && this.values.primed) {
    this.values.successful = true;
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    if (this.values.primed && this.values.successful) {
      this.bearer.boostLuck(5);
    }
    this.values.successful = false;
    this.values.primed = false;
  }
};

data['fry bread'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.party.length() <= 3) {
    data.strength += 2;
    data.wisdom += 2;
    data.dexterity += 2;
  }
};

data['sack of gold'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.time === Time.DAY) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['sack of silver'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.time === Time.NIGHT) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['paw paw'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.weather === Weather.RAIN) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['cassava'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.weather === Weather.WIND) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['sunflower'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.weather === Weather.SUN) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['crowberry'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS && Game.game.world.weather === Weather.SNOW) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['dream catcher'] = undefined;

data['serpentine armbands'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_LEAVE) {
    for (const hero of Game.game.party.members) {
      Stats.changeUnitStat(hero, Stats.STRENGTH, 1);
    }
  }
};

data['turkey headdress'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_LEAVE) {
    for (const hero of Game.game.party.members) {
      Stats.changeUnitStat(hero, Stats.WISDOM, 1);
    }
  }
};

data['deerskin boots'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_LEAVE) {
    for (const hero of Game.game.party.members) {
      Stats.changeUnitStat(hero, Stats.DEXTERITY, 1);
    }
  }
};

data['jade dagger'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += Game.game.party.members
      .filter((x: Hero) => x !== this.bearer)
      .map((x: Hero) => Stats.getOriginalStat(x, Stats.STRENGTH))
      .reduce((acc: number, x: number) => (x < acc ? x : acc), 1000);
  }
};

data['sunglasses'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom += Game.game.party.members
      .filter((x: Hero) => x !== this.bearer)
      .map((x: Hero) => Stats.getOriginalStat(x, Stats.WISDOM))
      .reduce((acc: number, x: number) => (x < acc ? x : acc), 1000);
  }
};

data['guanín amulet'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity += Game.game.party.members
      .filter((x: Hero) => x !== this.bearer)
      .map((x: Hero) => Stats.getOriginalStat(x, Stats.DEXTERITY))
      .reduce((acc: number, x: number) => (x < acc ? x : acc), 1000);
  }
};

data['echinacea'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    this.values.primed = true;
  }
  if (data.type === TriggerType.AFTER_FATIGUE && this.values.primed) {
    this.values.successful = true;
  }
  if (data.type === TriggerType.AFTER_EVENT) {
    if (this.values.primed && this.values.successful) {
      const stat = Stats.getRandomStat();
      Stats.setUnitStat(this.bearer, stat, Stats.getOriginalStat(this.bearer, stat));
    }
    this.values.successful = false;
    this.values.primed = false;
  }
};

data['frog glyph'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    Game.game.world.weather = Weather.RAIN;
  }
};

data['storm glyph'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    Game.game.world.weather = Weather.WIND;
  }
};

data['sun glyph'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    Game.game.world.weather = Weather.SUN;
  }
};

data['bird glyph'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED && data.hero === this.bearer) {
    Game.game.world.weather = Weather.SNOW;
  }
};

data['bag of salmon'] = function (data: Trigger) {
  if (Game.game.event.isTypeEvent(RapidEvent) && data.type === TriggerType.GET_LUCK) {
    data.luck = 100;
  }
};

data['drinking gourd'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_OBSTACLE) {
    data.pass = true;
  }
};

data['succotash'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['bluejay feather'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    if (!this.values.ticks) {
      data.luck = 100;
    }
  }
  if (data.type === TriggerType.AFTER_LUCK) {
    this.values.ticks = (this.values.ticks || 3) - 1;
  }
};

data['macuahuitl'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['amoxtli'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['huarache'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['rattle gourd'] = function (data: Trigger) {
  if (data.type === TriggerType.AFTER_SELECTED) {
    this.values.hero = data.hero;
    this.values.boost = Random.max(5) * 10;
    data.hero.boostLuck(this.values.boost);
  }
  if (data.type === TriggerType.AFTER_EVENT && this.values.hero) {
    this.values.hero.boostLuck(-this.values.boost);
    this.values.hero = undefined;
  }
};

data['lynx cape'] = undefined;

data['racoon cape'] = undefined;

data['deerskin cape'] = undefined;

data['bow and arrow'] = function (data: Trigger) {
  if (Game.game.event.isTypeEvent(DeerEvent)) {
    if (data.type === TriggerType.GET_LUCK) {
      data.luck = 100;
    }
    if (data.type === TriggerType.AFTER_LUCK) {
      data.hero.basket.unequip(this);
    }
  }
};

data['jungle manual'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_CHAIN) {
    data.morePlants = true;
  }
};

data['flowering sash'] = undefined;

data['bison totem'] = undefined;

data['eagle totem'] = undefined;

data['turtle totem'] = undefined;

data['corn and bean soup'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
    data.wisdom += 2;
    data.dexterity += 2;
  }
};

data['obsidian collar'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_RARITY) {
    data.floor = Rarity.UNCOMMON;
  }
};

data['eagle feather'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    data.luck += 100;
  }
};

data['condor feather'] = undefined;

data['quetzal feather'] = undefined;

data['hummingbird feather'] = undefined;

data["condor's cleaver"] = undefined;

data["quetzal's quiver"] = undefined;

data["eagle's aegis"] = undefined;

data['golden mirror'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_CHAIN) {
    data.easierCaves = true;
  }
};

data['pine needle tea'] = undefined;

data['jade collar'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_RARITY) {
    data.floor = Rarity.RARE;
  }
};

data['turquoise mask'] = undefined;

data['jade mask'] = undefined;

data['gold mask'] = undefined;

data['pemmican'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_FATIGUE) {
    const str = Stats.getUnitStat(this.bearer, Stats.STRENGTH);
    const wis = Stats.getUnitStat(this.bearer, Stats.WISDOM);
    const dex = Stats.getUnitStat(this.bearer, Stats.DEXTERITY);
    if (str === wis && wis === dex) {
      data.fatigue = false;
    }
  }
};

data['turquoise ring'] = function (data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 3;
    data.wisdom += 3;
    data.dexterity += 3;
  }
};

data['medicine wheel'] = undefined;

data['spirit rattle'] = undefined;

export default data;
