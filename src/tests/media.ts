import HistoryManager from '../media/history';
import GameAudio from '../media/audio';
import Graphics from '../media/graphics';
import View from '../ui/view';
import Game from '../game';

export class TestAudio extends GameAudio {
  async loadAudio(): Promise<void> {}
  play(_index: number): void {}
}

export class TestGraphics extends Graphics {
  setup(): void {}
  setSize(): void {}
  frame(_game: Game, _view: View): void {}
  async loadInitialAsset(): Promise<void> {}
  async loadAssets(): Promise<void> {}
}

export class TestHistory extends HistoryManager {
  async initialize(): Promise<void> {}
  async save(): Promise<void> {}
  protected async load(): Promise<void> {}
}
