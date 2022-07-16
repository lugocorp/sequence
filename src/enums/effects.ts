import Hero from '../entities/hero';
import Unit from '../entities/unit';
import { Trigger } from './types';

// The type used for item effect handlers
export type ItemEffect = (trigger: Trigger, hero: Hero, data: any) => void;

// The type used for ability effect handlers
export type AbilityEffect = (trigger: Trigger, caster: Unit, data: any) => void;