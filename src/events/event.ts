import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';

interface Event {
  render: (view: GameView, r: GraphicsRenderer) => void;
  click: (x: number, y: number) => void;
  state: number;
}

export default Event;