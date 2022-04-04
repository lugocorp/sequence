import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Selector from '../widgets/selector';
import HeroWidget from '../widgets/hero';
import Text from '../widgets/text';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Stats from '../enums/stats';
import Random from '../random';
import Event from './event';
import Game from '../game';

export default class ChallengeEvent implements Event {
  static PRELUDE         = 0;
  static VIEW_CHALLENGER = 1;
  static VIEW_PARTY      = 2;
  static FINISHED        = 3;
  private expectation: number[];
  private challenger: Challenger;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private result: boolean;
  private state: number;
  private viewChallenger: Text;
  private viewParty: Text;
  private continue: Text;

  constructor(challenger: Challenger) {
    const that = this;
    this.state = ChallengeEvent.PRELUDE;
    this.challenger = challenger;
    this.heroViewer = new HeroWidget();
    this.selector = new Selector(
      Game.game.party.length(),
      (i: number) => Game.game.party.get(i),
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        that.result = that.playerOvercomesChallenge(result as Hero, that.challenger);
        that.state = ChallengeEvent.FINISHED;
      }
    );
    this.viewChallenger = new Text('view challenger', 25, 190, false, () => {
      that.state = ChallengeEvent.VIEW_CHALLENGER;
    });
    this.viewParty = new Text('view party', 25, 190, false, () => {
      that.state = ChallengeEvent.VIEW_PARTY;
    });
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === ChallengeEvent.PRELUDE) {
        that.state = ChallengeEvent.VIEW_CHALLENGER;
      }
      if (that.state === ChallengeEvent.FINISHED) {
        Game.game.progress();
      }
    });
    this.expectation = [Random.max(Stats.N)];
    if (Random.passes(0.5)) {
      this.expectation.push(((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + Stats.N) % Stats.N);
    }
  }

  playerOvercomesChallenge(hero: Hero, challenger: Challenger): boolean {
    let sum1: number = Stats.getUnitStat(hero, this.expectation[0]);
    let sum2: number = Stats.getUnitStat(challenger, this.expectation[0]);
    if (this.expectation.length > 1) {
      sum1 += Stats.getUnitStat(hero, this.expectation[1]);
      sum2 += Stats.getUnitStat(challenger, this.expectation[1]);
    }
    return (sum1 > sum2) || (sum1 === sum2 && Random.passes(hero.luck / 100));
  }

  click(): void {
    if (this.state === ChallengeEvent.VIEW_CHALLENGER) {
      this.viewParty.click();
    } else if (this.state === ChallengeEvent.VIEW_PARTY) {
      if (this.heroViewer.viewingHero()) {
        this.viewChallenger.click();
        this.selector.click();
      }
      this.heroViewer.click();
    }
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === ChallengeEvent.PRELUDE) {
      r.drawParagraph('your party comes across a challenger', 2, 0);
      const message = (this.expectation.length === 1) ?
        `this will be a challenge of ${Stats.getStatName(this.expectation[0])}.` :
        `this will be a challenge of ${Stats.getStatName(this.expectation[0])} and ${Stats.getStatName(this.expectation[1])}.`;
      r.drawParagraph(message, 0, 30);
      this.continue.render(view, r);
    }
    if (this.state === ChallengeEvent.VIEW_CHALLENGER) {
      view.challengerCard(r, this.challenger);
      this.viewParty.render(view, r);
    }
    if (this.state === ChallengeEvent.VIEW_PARTY) {
      this.heroViewer.render(view, r);
      if (this.heroViewer.viewingHero()) {
        this.viewChallenger.render(view, r);
        this.selector.render(view, r);
      }
    }
    if (this.state === ChallengeEvent.FINISHED) {
      r.drawParagraph(this.result ? 'yay': 'oh no', 0, 0);
      this.continue.render(view, r);
    }
  }
}