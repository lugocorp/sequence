import GraphicsRenderer from '../graphics/renderer';

interface View {
  click: (x: number, y: number, down: boolean) => void;
  frame: (r: GraphicsRenderer) => void;
}

export default View;