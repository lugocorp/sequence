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
    super(Sprites.DIRE_CRAB, 'you choose a new party member to recruit.');
    const that = this;
    this.setAction('continue', () => that.viewRecruits());
    this.recruits = [
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero()
    ];
    this.memberSelector = Selector.heroSelector(Game.game.party.members);
    this.recruitSelector = Selector.heroSelector(this.recruits);
  }

  viewRecruits(): void {
    const that = this;
    this.selector = this.recruitSelector;
    this.actions = [
      new Action('choose', () => {
        if (Game.game.party.isFull()) {
          that.pleaseRemove();
        } else {
          that.finished();
        }
      }),
      new Action('view party', () => that.viewParty())
    ];
    this.selector.invalidate();
  }

  viewParty(): void {
    const that = this;
    this.selector = this.memberSelector;
    this.setAction('back', () => that.viewRecruits());
    this.selector.invalidate();
  }

  pleaseRemove(): void {
    const that = this;
    this.selector = undefined;
    this.setText('your party is full. please remove an existing member.');
    this.setAction('continue', () => that.removeMember());
  }

  removeMember(): void {
    const that = this;
    this.selector = this.memberSelector;
    this.setAction('choose', () => that.finished());
    this.selector.invalidate();
  }

  finished(): void {
    const that = this;
    this.selector = undefined;
    const recruit: Hero = this.recruitSelector.item();
    let text = `welcome ${recruit.name} to your party!`;
    if (Game.game.party.isFull()) {
      const member: Hero = this.memberSelector.item();
      text += ` ${member.name} left your party.`
      Game.game.party.remove(member);
    }
    Game.game.party.add(recruit);
    this.setText(text);
    this.setAction('continue', () => Game.game.progress());
  }

  /* private static PRELUDE       = 0;
  private static VIEW_RECRUITS = 1;
  private static VIEW_PARTY    = 2;
  private static PLEASE_REMOVE = 3;
  private static REMOVE_MEMBER = 4;
  private static FINISHED      = 5;
  private heroViewer: HeroWidget;
  private partySelector: Selector;
  private recruitSelector: Selector;
  private recruits: Hero[];
  private viewRecruits: Text;
  private viewParty: Text;
  private continue: Text;
  private selected: Hero;
  private removed: Hero;
  private state: number;

  constructor() {
    super();
    const that = this;
    this.recruits = [
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero(),
      Game.game.data.getRandomHero()
    ];
    this.state = RecruitEvent.PRELUDE;
    this.heroViewer = new HeroWidget();
    this.heroViewer.setHero(this.recruits[0]);
    this.partySelector = new Selector(
      Game.game.party.length(),
      (i: number) => Game.game.party.get(i),
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        if (that.state === RecruitEvent.REMOVE_MEMBER) {
          Game.game.party.remove(result as Hero);
          that.state = RecruitEvent.FINISHED;
          that.removed = result as Hero;
        }
      }
    );
    this.partySelector.showChoose = false;
    this.recruitSelector = new Selector(
      that.recruits.length,
      (i: number) => that.recruits[i],
      (value: any) => {
        that.heroViewer.setHero(value as Hero);
      },
      (result: any) => {
        if (that.state === RecruitEvent.VIEW_RECRUITS) {
          that.selected = result as Hero;
          that.state = (Game.game.party.length() === Party.MAX) ?
            RecruitEvent.PLEASE_REMOVE :
            RecruitEvent.FINISHED;
        }
      }
    );
    this.viewParty = new Text('view party', 30, 190, false, () => {
      if (that.state === RecruitEvent.VIEW_RECRUITS) {
        that.state = RecruitEvent.VIEW_PARTY;
        that.heroViewer.setHero(that.partySelector.getSelected() as Hero);
      }
    });
    this.viewRecruits = new Text('view recruits', 20, 190, false, () => {
      if (that.state === RecruitEvent.VIEW_PARTY) {
        that.state = RecruitEvent.VIEW_RECRUITS;
        that.heroViewer.setHero(that.recruitSelector.getSelected() as Hero);
      }
    });
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === RecruitEvent.PRELUDE) {
        that.state = RecruitEvent.VIEW_RECRUITS;
      }
      if (that.state === RecruitEvent.PLEASE_REMOVE) {
        that.partySelector.showChoose = true;
        that.state = RecruitEvent.REMOVE_MEMBER;
        that.heroViewer.setHero(that.partySelector.getSelected() as Hero);
      }
      if (that.state === RecruitEvent.FINISHED) {
        Game.game.party.add(that.selected);
        Game.game.progress();
      }
    });
  }

  click(): void {
    if ([RecruitEvent.PRELUDE, RecruitEvent.FINISHED, RecruitEvent.PLEASE_REMOVE].includes(this.state)) {
      this.continue.click();
    } else {
      if (this.heroViewer.viewingHero()) {
        if (this.state === RecruitEvent.VIEW_RECRUITS) {
          this.recruitSelector.click();
        } else {
          this.partySelector.click();
        }
      }
      if (this.state === RecruitEvent.VIEW_RECRUITS) {
        this.viewParty.click();
      } else if (this.state === RecruitEvent.VIEW_PARTY) {
        this.viewRecruits.click();
      }
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === RecruitEvent.PRELUDE) {
      r.drawParagraph('you choose a new party member to recruit.', 2, 2);
      this.continue.render(view, r);
    } else if (this.state === RecruitEvent.FINISHED) {
      r.drawParagraph(this.removed ?
        `${this.selected.name} joined your party in place of ${this.removed.name}.` :
        `${this.selected.name} joined your party.`,
        2, 2);
      this.continue.render(view, r);
    } else if (this.state === RecruitEvent.PLEASE_REMOVE) {
      r.drawParagraph(`your party is full. you will need to remove a party member.`, 2, 2);
      this.continue.render(view, r);
    } else {
      this.heroViewer.render(view, r);
      if (this.heroViewer.viewingHero()) {
        if (this.state === RecruitEvent.VIEW_RECRUITS) {
          this.recruitSelector.render(view, r);
        } else {
          this.partySelector.render(view, r);
        }
      }
      if (this.state === RecruitEvent.VIEW_RECRUITS) {
        this.viewParty.render(view, r);
      }
      if (this.state === RecruitEvent.VIEW_PARTY) {
        this.viewRecruits.render(view, r);
      }
    }
  } */
}