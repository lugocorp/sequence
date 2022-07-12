
export default class Selector<T> {
  select: (e: T) => void;
  private index: number;
  private data: T[];

  constructor(data: T[], select: (e: T) => void) {
    this.select = select;
    this.data = data;
    this.index = 0;
  }

  item(): T {
    return this.data[this.index];
  }

  size(): number {
    return this.data.length;
  }
}