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
  static element(list: any[]): any {
    return list[Math.floor(Random.next() * list.length)];
  }

  // Returns a random value from an enum
  static enum<T>(e: T): T[keyof T] {
    const enumValues = Object.keys(e)
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    return enumValues[Random.max(enumValues.length)];
  }

  // Returns a random element from the given weighted array
  static weighted<T>(list: [number, T][], total?: number): T {
    const sum = list.reduce((acc: number, x: [number, T]) => acc + x[0], 0);
    if (!isNaN(total) && total !== sum) {
      throw new Error(`weighted list probabilities do not add up to ${total}`);
    }
    let roll = Math.floor(Random.next() * sum);
    let i = 0;
    while (roll >= list[i][0] && i < list.length - 1) {
      roll -= list[i][0];
      i++;
    }
    return list[i][1];
  }
}
