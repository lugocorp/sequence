import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
import Party from '../../entities/party';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event you choose a new party member.
 */
export default class RecruitEvent extends View {
  private recruitSelector: Selector<Hero>;
  private memberSelector: Selector<Hero>;
  private recruits: Hero[];

  constructor() {
    super();
    const that = this;
    this.recruits = [
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero()
    ];
    this.memberSelector = Selector.heroSelector(Game.game.party.members);
    this.recruitSelector = Selector.heroSelector(this.recruits);
    this.set(Sprites.DIRE_CRAB, 'you choose a new party member to recruit.', [
      new Action('continue', () => that.viewRecruits())
    ]);
  }

  viewRecruits(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [
        new Action('choose', () => {
          if (Game.game.party.isFull()) {
            that.pleaseRemove();
          } else {
            that.finished();
          }
        }),
        new Action('view party', () => that.viewParty())
      ],
      this.recruitSelector
    );
  }

  viewParty(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      '',
      [ new Action('back', () => that.viewRecruits()) ],
      this.memberSelector
    );
  }

  pleaseRemove(): void {
    const that = this;
    this.set(Sprites.DIRE_CRAB, 'your party is full. please remove an existing member.', [
      new Action('continue', () => that.removeMember())
    ]);
  }

  removeMember(): void {
    const that = this;
    this.set(
      Sprites.DIRE_CRAB, '',
      [ new Action('choose', () => that.finished()) ],
      this.memberSelector
    );
  }

  finished(): void {
    const that = this;
    const recruit: Hero = this.recruitSelector.item();
    let text = `welcome ${recruit.name} to your party!`;
    if (Game.game.party.isFull()) {
      const member: Hero = this.memberSelector.item();
      text += ` ${member.name} left your party.`
      Game.game.party.remove(member);
    }
    Game.game.party.add(recruit);
    this.set(Sprites.DIRE_CRAB, text, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}