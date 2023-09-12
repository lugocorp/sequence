import { Weather } from '../../types';
import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import EventView from '../event';
import View from '../view';

export default class WeatherEvent extends EventView {
  getViews(): View[] {
    let desc: string;
    let sprite: Sprites;
    const cave = this.game.world.cave;
    const weather = Random.enum(Weather);
    switch (weather) {
      case Weather.SUN:
        desc = cave
          ? 'sun begins to shine outside of the cave.'
          : 'the clouds part and the sun shines down on your party members.';
        sprite = Sprites.SUN;
        break;
      case Weather.RAIN:
        desc = cave
          ? 'rain begins to fall outside of the cave.'
          : 'your party feels a shift as rain begins to fall from the sky.';
        sprite = Sprites.RAIN;
        break;
      case Weather.WIND:
        desc = cave
          ? 'wind begins to howl outside of the cave.'
          : 'the winds pick up and envelop your party as their adventure continues.';
        sprite = Sprites.WIND;
        break;
      case Weather.SNOW:
        desc = cave
          ? 'snow begins to fall outside of the cave.'
          : 'the temperature drops and frozen rain falls from the sky.';
        sprite = Sprites.SNOW;
        break;
    }
    return [{
      image: sprite,
      text: desc,
      actions: {
        'continue': () => {
          this.game.world.weather = weather;
          this.game.progress();
        }
      }
    }];
  }
}
