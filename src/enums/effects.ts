import Hero from '../entities/hero';
import Unit from '../entities/unit';
import { Trigger } from './types';

// The type used for item and ability effect handlers
type Effect = (trigger: Trigger, hero: Hero, data: any) => void;
export default Effect;