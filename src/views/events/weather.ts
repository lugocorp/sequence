import {Weather} from '../../enums/world';
import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class WeatherEvent extends View {
  private weather: Weather;
  private sprite: number;
  private desc: string;

  constructor() {
    super();
    const that = this;
    this.weather = Random.enum(Weather);
    switch (this.weather) {
      case Weather.SUN:
        this.desc = 'the clouds part and the sun shines down on your party members';
        this.sprite = Sprites.SUN;
        break;
      case Weather.RAIN:
        this.desc = 'your party feels a shift as rain begins to fall from the sky';
        this.sprite = Sprites.RAIN;
        break;
      case Weather.WIND:
        this.desc = 'the winds pick up and envelop your party as their adventure continues';
        this.sprite = Sprites.WIND;
        break;
      case Weather.SNOW:
        this.desc = 'the temperature drops and frozen rain falls from the sky';
        this.sprite = Sprites.RAIN;
        break;
    }
    this.setDetails(
      this.sprite,
      this.desc,
      [
        new Action('continue', () => {
          Game.game.world.weather = that.weather;
          Game.game.progress();
        })
      ]
    );
  }
}