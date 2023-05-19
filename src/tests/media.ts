import HistoryManager from '../media/history';
import GameAudio from '../media/audio';
import Graphics from '../media/graphics';
import View from '../ui/view';
import Game from '../game';

export class TestAudio extends GameAudio {
  async loadAudio(): Promise<void> {}
  play(index: number): void {}
}

export class TestGraphics extends Graphics {
  setup(): void {}
  setSize(): void {}
  frame(game: Game, view: View): void {}
  async loadInitialAsset(): Promise<void> {}
  async loadAssets(): Promise<void> {}
}

export class TestHistory extends HistoryManager {
  async initialize(): Promise<void> {}
  async save(): Promise<void> {}
  protected async load(): Promise<void> {}
}
