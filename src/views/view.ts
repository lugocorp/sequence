import GraphicsRenderer from '../graphics/renderer';

interface View {
  frame: (r: GraphicsRenderer) => void;
  click: () => void;
}

export default View;