
// Dictates the number of ticks between the day/night cycle
export const DAY_NIGHT_CYCLE = 5;

export enum Time {
  NIGHT,
  DAY
}

export enum Weather {
  SUN,
  RAIN,
  WIND
}

export type World = {
  weather: Weather,
  time: Time
};