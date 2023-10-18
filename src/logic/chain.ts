/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import { Time } from '../types';
import EventView from '../views/event';
import ButterflyFieldEvent from '../views/events/butterflyfield';
import PlantingSeasonEvent from '../views/events/plantingseason';
import SuspiciousItemEvent from '../views/events/suspiciousitem';
import ThreeSistersEvent from '../views/events/threesisters';
import HungryBadgerEvent from '../views/events/hungrybadger';
import TradingPostEvent from '../views/events/tradingpost';
import BabyPeccaryEvent from '../views/events/babypeccary';
import MedicineManEvent from '../views/events/medicineman';
import YauponHollyEvent from '../views/events/yauponholly';
import SkinwalkerEvent from '../views/events/skinwalker';
import ChallengeEvent from '../views/events/challenge';
import OldBridgeEvent from '../views/events/oldbridge';
import WaterfallEvent from '../views/events/waterfall';
import SnakeBiteEvent from '../views/events/snakebite';
import OfferingEvent from '../views/events/offering';
import ProphecyEvent from '../views/events/prophecy';
import SiblingsEvent from '../views/events/siblings';
import MerchantEvent from '../views/events/merchant';
import CaravanEvent from '../views/events/caravan';
import WeatherEvent from '../views/events/weather';
import FatigueEvent from '../views/events/fatigue';
import VillageEvent from '../views/events/village';
import SunriseEvent from '../views/events/sunrise';
import RequestEvent from '../views/events/request';
import PrairieEvent from '../views/events/prairie';
import ForageEvent from '../views/events/forage';
import CliffsEvent from '../views/events/cliffs';
import CoyotlEvent from '../views/events/coyotl';
import RabbitEvent from '../views/events/rabbit';
import CactusEvent from '../views/events/cactus';
import MentorEvent from '../views/events/mentor';
import RavenEvent from '../views/events/raven';
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import RiverEvent from '../views/events/river';
import DreamEvent from '../views/events/dream';
import StormEvent from '../views/events/storm';
import EagleEvent from '../views/events/eagle';
import GiftEvent from '../views/events/gift';
import DeerEvent from '../views/events/deer';
import CaveEvent from '../views/events/cave';
import SeedEvent from '../views/events/seed';
import EggEvent from '../views/events/egg';
import Random from './random';
import Game from '../game';

type EventGenerator = (game: Game) => EventView;

export default class EventChain {
    private previouslyPlanned: string;
    futures: FutureEvent[] = [];
    events: EventView[];

    constructor(private readonly game: Game) {}

    setup() {
        this.events = [ new BeginEvent(this.game) ];
    }

    // Queues a FutureEvent
    futureEvent(view: EventView, turns: number, valid?: () => boolean): void {
        this.futures.push(new FutureEvent(view, turns, valid));
    }

    /*
     * This function returns the roll table for the next event
     */
    private getEventRollTable(): [number, EventGenerator][] {
        let table: [number, EventGenerator][] = [
            [ 20, (game: Game) => new ChallengeEvent(game) ], // 20
            [ 13, (game: Game) => new RequestEvent(game) ], // 33
            [ 8, (game: Game) => new WeatherEvent(game) ], // 41
            [ 4, (game: Game) => new OfferingEvent(game) ], // 45
            [ 4, (game: Game) => new CoyotlEvent(game) ], // 49
            [ 2, (game: Game) => new ForageEvent(game) ], // 51
            [ 2, (game: Game) => new GiftEvent(game) ], // 53
            [ 2, (game: Game) => new EggEvent(game) ], // 55
            [ 2, (game: Game) => new PlantingSeasonEvent(game) ], // 57
            [ 2, (game: Game) => new HungryBadgerEvent(game) ], // 59
            [ 2, (game: Game) => new CliffsEvent(game) ], // 61
            [ 2, (game: Game) => new TradingPostEvent(game) ], // 63
            [ 2, (game: Game) => new RiverEvent(game) ], // 65
            [ 2, (game: Game) => new CaravanEvent(game) ], // 67
            [ 2, (game: Game) => new MedicineManEvent(game) ], // 69
            [ 2, (game: Game) => new YauponHollyEvent(game) ], // 71
            [ 2, (game: Game) => new RavenEvent(game) ], // 73
            [ 2, (game: Game) => new RabbitEvent(game) ], // 75
            [ 2, (game: Game) => new SeedEvent(game) ], // 77
            [ 2, (game: Game) => new SnakeBiteEvent(game) ], // 79
            [ 2, (game: Game) => new StormEvent(game) ], // 81
            [ 2, (game: Game) => new PrairieEvent(game) ], // 83
            [ 1, (game: Game) => new BabyPeccaryEvent(game) ], // 84
            [ 1, (game: Game) => new CactusEvent(game) ], // 85
            [ 1, (game: Game) => new MentorEvent(game) ], // 86
            [ 1, (game: Game) => new SunriseEvent(game) ], // 87
            [ 1, (game: Game) => new SuspiciousItemEvent(game) ], // 88
            [ 1, (game: Game) => new ProphecyEvent(game) ], // 89
            [ 1, (game: Game) => new DeerEvent(game) ], // 90
            [ 1, (game: Game) => new CaveEvent(game) ], // 91
            [ 1, (game: Game) => new ThreeSistersEvent(game) ], // 92
            [ 1, (game: Game) => new OldBridgeEvent(game) ], // 93
            [ 1, (game: Game) => new VillageEvent(game) ], // 94
            [ 1, (game: Game) => new MerchantEvent(game) ], // 95
            [ 1, (game: Game) => new DreamEvent(game) ], // 96
            [ 1, (game: Game) => new SiblingsEvent(game) ], // 97
            [ 1, (game: Game) => new WaterfallEvent(game) ], // 98
            [ 1, (game: Game) => new ButterflyFieldEvent(game) ], // 99
            [ 1, (game: Game) => new EagleEvent(game) ] // 100
        ];
        if (this.game.world.cave) {
            table = [
                [ 20, (game: Game) => new ChallengeEvent(game) ], // 20
                [ 10, (game: Game) => new RequestEvent(game) ], // 30
                [ 10, (game: Game) => new OfferingEvent(game) ], // 40
                [ 10, (game: Game) => new GiftEvent(game) ], // 50
                [ 10, (game: Game) => new RavenEvent(game) ], // 60
                [ 5, (game: Game) => new MentorEvent(game) ], // 65
                [ 5, (game: Game) => new ProphecyEvent(game) ], // 70
                [ 5, (game: Game) => new BabyPeccaryEvent(game) ], // 75
                [ 5, (game: Game) => new SkinwalkerEvent(game) ], // 80
                [ 4, (game: Game) => new RabbitEvent(game) ], // 84
                [ 4, (game: Game) => new WeatherEvent(game) ], // 88
                [ 4, (game: Game) => new EggEvent(game) ], // 92
                [ 4, (game: Game) => new HungryBadgerEvent(game) ], // 96
                [ 2, (game: Game) => new DreamEvent(game) ], // 98
                [ 2, (game: Game) => new SnakeBiteEvent(game) ] // 100
            ];
        }
        if (this.game.world.time === Time.NIGHT && !this.game.world.cave) {
            table.push([ 3, (game: Game) => new SkinwalkerEvent(game) ]);
        }
        return table;
    }

    /*
     * Returns a random penalty event for when you run from spirits
     */
    getPenaltyEvent(): EventView {
        return Random.weighted([
            [1, (game: Game) => new HungryBadgerEvent(game)],
            [1, (game: Game) => new SkinwalkerEvent(game)],
            [1, (game: Game) => new OldBridgeEvent(game)],
            [1, (game: Game) => new SnakeBiteEvent(game)],
            [1, (game: Game) => new CliffsEvent(game)],
            [1, (game: Game) => new CoyotlEvent(game)],
            [1, (game: Game) => new RabbitEvent(game)],
            [1, (game: Game) => new RavenEvent(game)],
            [1, (game: Game) => new RiverEvent(game)],
            [1, (game: Game) => new StormEvent(game)],
        ])(this.game);
    }

    /*
     * This function clears the chain's internal state
     */
    clear(): void {
        this.futures = [];
        this.events = [ new BeginEvent(this.game) ];
    }

    /*
     * This function returns the current event in the sequence.
     */
    latest(): EventView {
        for (const hero of this.game.party.members) {
            if (hero.stats.energy === 0) {
                return new FatigueEvent(this.game, hero);
            }
        }
        if (!this.game.party.size) {
            return new DeathEvent(this.game);
        }
        if (!this.events.length) {
            this.plan();
        }
        return this.events[0];
    }

    /*
     * This function plans out future events based on various factors.
     * It's the core algorithm that runs the game, and it basically
     * determines difficulty.
     */
    plan(): void {
        // Tick future events and push if they're ready
        let a = 0;
        let future = false;
        while (a < this.futures.length) {
            const v: EventView = this.futures[a].tick();
            if (v) {
                if (this.futures[a].valid()) {
                    this.events.push(v);
                    future = true;
                }
                this.futures.splice(a, 1);
            } else {
                a++;
            }
        }
        if (future) {
            return;
        }

        // Roll for the next event
        const event: EventGenerator = Random.weighted(
            this.getEventRollTable().filter(
                (x: [number, EventGenerator]) =>
                    x[1].toString().includes('ChallengeEvent') ||
                    x[1].toString().includes('RequestEvent') ||
                    x[1].toString() !== this.previouslyPlanned
            )
        );
        this.previouslyPlanned = event.toString();
        this.events.push(event(this.game));
    }
}

// An event to show in the future
class FutureEvent {
    constructor(
        private event: EventView,
        private turns: number,
        public valid: () => boolean = () => true
    ) {}

    tick(): EventView {
        return --this.turns <= 0 ? this.event : undefined;
    }
}
