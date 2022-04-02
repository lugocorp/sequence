import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';

interface Event {
  render: (view: GameView, r: GraphicsRenderer) => void;
  click: () => void;
}

export default Event;