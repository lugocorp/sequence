import GraphicsRenderer from '../graphics/renderer';

interface View {
  click: (x: number, y: number) => void;
  frame: (GraphicsRenderer) => void;
}

export default View;