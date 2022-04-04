
export default class Random {

  private static next(): number {
    return Math.random();
  }

  static max(max: number): number {
    return Math.floor(Random.next() * max);
  }

  static passes(chance: number): boolean {
    return Random.next() < chance;
  }

  static randomElement(list: any[]): any {
    return list[Math.floor(Random.next() * list.length)];
  }

  static weightedList(list: [number, any][]): any {
    const sum = list.reduce((acc: number, x: [number, any]) => acc + x[0], 0);
    let roll = Math.floor(Random.next() * sum);
    let i = 0;
    while (roll >= list[i][0]) {
      roll -= list[i][0];
      i++;
    }
    return list[i][1];
  }
}