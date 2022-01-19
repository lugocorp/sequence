import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';

interface Event {
  render: (GameView, GraphicsRenderer) => void;
  click: (x: number, y: number) => void;
  state: number;
}

export default Event;