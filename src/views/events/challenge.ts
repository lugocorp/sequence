import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
import Challenger from '../../entities/challenger';
import Hero from '../../entities/hero';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class ChallengeEvent extends View {
  private heroSelector: Selector<Hero>;
  private challenger: Challenger;
  private expectation: number[];

  constructor() {
    super(Sprites.DIRE_CRAB);
    const that = this;
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.challenger = Game.game.data.getRandomChallenger();
    this.expectation = [Random.max(Stats.N)];
    if (Random.passes(0.5)) {
      this.expectation.push(((Random.passes(0.5) ? 1 : -1) + this.expectation[0] + Stats.N) % Stats.N);
    }
    const message = 'your party comes across a spirit who offers a challenge.' +
      ((this.expectation.length === 1) ?
        `this will be a test of ${Stats.getStatName(this.expectation[0])}.` :
        `this will be a test of ${Stats.getStatName(this.expectation[0])} and ${Stats.getStatName(this.expectation[1])}.`);
    this.setText(message);
    this.setAction('continue', () => that.viewChallenger());
  }

  viewChallenger(): void {
    const that = this;
    this.setText(this.challenger.name);
    this.setAction('view party', () => that.viewParty());
  }

  viewParty(): void {
    const that = this;
    this.selector = this.heroSelector;
    this.selector.invalidate();
    this.actions = [
      new Action('view spirit', () => that.viewChallenger()),
      new Action('choose', () => that.finish())
    ];
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    const result: boolean = this.playerOvercomesChallenge(hero, this.challenger);
    const message = result ?
      `${hero.name} overcame the spirit's challenge!` :
      `${hero.name} did not succeed in the spirit's challenge.`;
    this.selector = undefined;
    this.setText(message);
    this.setAction('continue', () => Game.game.progress());
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

  /* private static PRELUDE         = 0;
  private static VIEW_CHALLENGER = 1;
  private static VIEW_PARTY      = 2;
  private static FINISHED        = 3;
  private expectation: number[];
  private challenger: Challenger;
  private heroViewer: HeroWidget;
  private selector: Selector;
  private result: boolean;
  private state: number;
  private viewChallenger: Text;
  private viewParty: Text;
  private continue: Text;

  constructor() {
    super();
    const that = this;
    this.state = ChallengeEvent.PRELUDE;
    this.challenger = Game.game.data.getRandomChallenger();
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
    this.viewChallenger = new Text('view challenger', 12, 190, false, () => {
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

  // Returns true if the selected hero overcame the challenge
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
      const message = 'your party comes across a spirit who offers a challenge.' +
        ((this.expectation.length === 1) ?
          `this will be a test of ${Stats.getStatName(this.expectation[0])}.` :
          `this will be a test of ${Stats.getStatName(this.expectation[0])} and ${Stats.getStatName(this.expectation[1])}.`);
      r.drawParagraph(message, 2, 2);
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
      const name = (this.selector.getSelected() as Hero).name;
      const message = this.result ?
        `${name} overcame the spirit's challenge!` :
        `${name} did not succeed in the spirit's challenge.`;
      r.drawParagraph(message, 2, 2);
      this.continue.render(view, r);
    }
  } */
}