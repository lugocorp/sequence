import Hero from '../entities/hero';
import Challenger from '../entities/challenger';
import DeerEvent from '../views/events/deer';
import RapidEvent from '../views/events/rapid';
import ObstacleEvent from '../views/events/obstacle';
import ChallengeEvent from '../views/events/challenge';
import { Trigger, TriggerType, Effect } from '../types';
import { Weather, Time } from '../types';
import Rarity from '../enums/rarity';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Game from '../game';
const data: Record<string, Effect> = {};

data['corn'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength++;
  }
};

data['squash'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom++;
  }
};

data['beans'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity++;
  }
};

data['turquoise bead'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    data.luck += 5;
  }
};

data['copper axe'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
    data.wisdom--;
  }
};

data['quipu'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom += 2;
    data.dexterity--;
  }
};

data['moccasins'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity += 2;
    data.strength--;
  }
};

data['fry bread'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.party.length() <= 3) {
    data.strength += 2;
    data.wisdom += 2;
    data.dexterity += 2;
  }
};

data['sack of gold'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.time === Time.DAY) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['sack of silver'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.time === Time.NIGHT) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['paw paw'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.RAIN) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['cassava'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.WIND) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['sunflower'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.SUN) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['crowberry'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.SNOW) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['succotash'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength++;
    data.wisdom++;
    data.dexterity++;
  }
};

data['macuahuitl'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['amoxtli'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.wisdom += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['huarache'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.dexterity += 2;
  }
  if (data.type === TriggerType.GET_LUCK) {
    data.luck -= 5;
  }
};

data['corn and bean soup'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 2;
    data.wisdom += 2;
    data.dexterity += 2;
  }
};

data['eagle feather'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_LUCK) {
    data.luck += 100;
  }
};

data['turquoise ring'] = function (game: Game, data: Trigger) {
  if (data.type === TriggerType.GET_STATS) {
    data.strength += 3;
    data.wisdom += 3;
    data.dexterity += 3;
  }
};

export default data;
