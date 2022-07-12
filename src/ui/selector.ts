
export default class Selector<T> {
  select: (e: T) => void;
  private data: T[];
  index: number;

  constructor(data: T[], select: (e: T) => void) {
    this.select = select;
    this.data = data;
    this.index = 0;
  }

  invalidate(): void {
    this.select(this.item());
  }

  item(): T {
    return this.data[this.index];
  }

  size(): number {
    return this.data.length;
  }
}