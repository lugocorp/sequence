
export default class Random {

    // The core random number generator function
  private static next(): number {
    return Math.random();
  }

  // Returns a whole number in [0, max)
  static max(max: number): number {
    return Math.floor(Random.next() * max);
  }

  // Returns true at a rate of (chance)%
  static passes(chance: number): boolean {
    return Random.next() < chance;
  }

  // Returns a random element from the given array
  static randomElement(list: any[]): any {
    return list[Math.floor(Random.next() * list.length)];
  }

  // Returns a random element from the given weighted array
  static weightedList(list: [number, any][]): any {
    const sum = list.reduce((acc: number, x: [number, any]) => acc + x[0], 0);
    let roll = Math.floor(Random.next() * sum);
    let i = 0;
    while (roll >= list[i][0] && i < list.length - 1) {
      roll -= list[i][0];
      i++;
    }
    return list[i][1];
  }
}