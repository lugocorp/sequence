import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

/*
 * In this event you choose a new party member.
 */
export default class RecruitEvent extends EventView {
  static label = 'recruit';
  private recruitSelector: Selector<Hero>;
  private memberSelector: Selector<Hero>;
  private recruits: Hero[];

  constructor(game: Game) {
    super(RecruitEvent);
    const that = this;
    this.recruits = [
      game.data.getRandomHero(),
      game.data.getRandomHero(),
      game.data.getRandomHero()
    ];
    this.recruitSelector = Selector.heroSelector(game.party, this.recruits);
    this.setDetails(
      this.recruits[0].sprite,
      'your party comes across another group of travelers.',
      [
        new Action('continue', () =>
          that.setDetails(
            this.recruits[0].sprite,
            'you can choose one traveler to recruit into your party.',
            [ new Action('continue', () => that.viewRecruits(game)) ]
          )
        )
      ]
    );
  }

  init(game: Game): void {
    this.memberSelector = Selector.heroSelector(game.party, game.party.members);
  }

  viewRecruits(game: Game): void {
    const that = this;
    this.setSelector(this.recruitSelector, [
      new Action('choose', () => {
        if (game.party.isFull()) {
          that.pleaseRemove(game);
        } else {
          that.finished(game);
        }
      }),
      new Action('view party', () => that.viewParty(game))
    ]);
  }

  viewParty(game: Game): void {
    const that = this;
    this.setSelector(this.memberSelector, [ new Action('back', () => that.viewRecruits(game)) ]);
  }

  pleaseRemove(game: Game): void {
    const that = this;
    this.setDetails(
      this.recruitSelector.item().sprite,
      'your party is full. please remove an existing member.',
      [ new Action('continue', () => that.removeMember(game)) ]
    );
  }

  removeMember(game: Game): void {
    const that = this;
    this.setSelector(this.memberSelector, [ new Action('choose', () => that.finished(game)) ]);
  }

  finished(game: Game): void {
    const recruit: Hero = this.recruitSelector.item();
    let text = `welcome ${recruit.name} to your party!`;
    if (game.party.isFull()) {
      const member: Hero = this.memberSelector.item();
      text += ` ${member.name} left your party.`;
      game.party.remove(member);
    }
    game.party.add(recruit);
    this.setDetails(recruit.sprite, text, [ new Action('continue', () => game.progress()) ]);
  }
}
