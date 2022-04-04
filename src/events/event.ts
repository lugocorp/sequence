import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';

interface Event {
  click: () => void;
  render: (view: GameView, r: GraphicsRenderer) => void;
}

export default Event;