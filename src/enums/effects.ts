import Hero from '../entities/hero';
import { Trigger } from './types';

// The type used for item effect handlers
type Effect = (trigger: Trigger, hero: Hero, data: any) => void;
export default Effect;
