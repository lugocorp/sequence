# Sequence Dungeons
This is a rogue-like game set in an Indigenous fantasy world where you build an ever-shifting party to overcome a string of events.
The core of the game is around strategic choice making.
You'll have clear ideas of the immediate outcome of your choices but only a speculation about later consequences.
The game is written in TypeScript and runs on mobile platforms using Cordova.

## Commands
We have a number of `npm` commands:
- `start` runs the game server and listens for code changes
- `compile` builds all the TypeScript code
- `format` makes the code pretty and lints everything
- `audit` checks the game data for any illegal values
- `android` compiles and deploys the game to an android device

## Todo
#### Setup
- [x] Set up basic canvas layout
- [x] Set up TypeScript
- [x] Get canvas to scale by multiples of some number
- [x] Create basic interface of future graphics loading system
- [x] Set up enemy and character classes
- [x] Reorganize `src` folder and imports
- [x] Add some game pieces into a JSON object (use the spreadsheet)
- [x] Create factory classes for heroes, enemies, abilities and items (will pull from JSON data)
- [x] Add a linter and reformat the comments
- [x] Set up the party structure in the `Game` class
- [x] Add a test server for development (enable module-based imports)
- [x] Figure out a good resolution value to work in

#### Basic gameplay
- [x] Create enemy card UI
- [x] Create hero card UI
- [x] Organize the game view into an event sequence
- [x] Rewrite click propagation to include on click down and click up (reuse coordinates from click down, this is for graphical feedback)
- [x] Bring the encounter event UI together
- [x] Implement the loot event
- [x] Implement a lose state
- [x] Implement the treasure event
- [x] Copy the encounter event for a boss event

#### Gearing up for the final stretch
- [x] Add a few more sprites and test data
- [x] Implement typed damage (weaknesses and resistances)
- [x] Implement items and abilities (descriptions and effects)
- [x] Create a game data compiler that checks the data folder for illegal values
- [x] Remove some of the less necessary enums now that we have the compiler
- [x] Add views for loading, instructions, credits, and game start
- [x] Add aftermath or prelude states to game events so things flow more smoothly
- [x] Share with Indigenous Game Devs group
- [x] Rework on-screen text to make animations easier

#### Redesign to be less convoluted
- [x] Rework game data types into the new models
- [x] Rip out battle code and replace with generalized challenges
- [x] Add other new events
- [x] Clean up the code
- [x] Comment all the new code
- [x] Make sure all prelude/aftermath scenes flow well
- [x] Throw in some game data
- [x] Flesh out the gift and offering events
- [x] Write a few events (trap, obstacle, recruit)
- [x] Research and ask cultural consultants to help come up with character concepts, double check core gameplay

#### Alpha Build
- [x] Lock down art style and UI
- [x] Rewrite UI as needed and make everything line up in a pretty way
- [x] Clean up all events
- [x] Add new events and systems
- [x] Add consultants into the game credits
- [x] Add sounds into the game (just to accentuate certain events)
- [x] Code the fatigue system and rework events accordingly
- [x] Draw some beta sprites
- [x] Allow a new game to be started without without exiting the app
- [x] Add party member data
- [x] Add a bunch of items
- [x] Finish all beta graphics

#### Path to Launch
- [x] Replace audio files with less annoying sound effects
- [x] Implement high score screen (store past runs, create a points system, etc)
- [x] Change existing events and implement new ones
- [x] Add new character/challenger data, rework the auditor
- [x] Implement most item effects
- [x] Package with new placeholder graphics, launch a browser-based open beta
- [x] Finish item logic
- [x] Add new background + event sprites
- [ ] Draw item sprites
- [ ] Finally draw playable character and challenger sprites
- [ ] Rebase project on top of the Wildflower codebase
- [ ] Clean up all code (revamp model hierarchy, dynamic stat accessors, history type)
- [ ] Design/draw the other half of playable characters
- [ ] Update beta with feedback

#### Marketing/launch
- [ ] Release a YouTube devlog video for the creation process
- [ ] Create some graphics for the play store
- [ ] Test an iOS build of the game
- [ ] Look into an Apple developer ID and app store requirements
- [ ] Incorporate all beta feedback and remove anything that says beta
- [ ] Launch the full game
