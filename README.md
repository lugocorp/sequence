# Sequence Dungeons

## Commands
We have a number of `npm` commands:
- `start` runs the game server and listens for code changes
- `compile` builds all the TypeScript code
- `lint` lints the project
- `audit` checks the game data for any illegal values

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
- [ ] Comment all the new code
- [ ] Make sure all prelude/aftermath scenes flow well
- [ ] Throw in some game data
- [ ] Research and ask cultural consultants to help come up with character concepts, double check core gameplay

#### Finishing it up
- [ ] Lock down art style and UI
- [ ] Add sounds into the game (just to accentuate certain events)
- [ ] Code the event progression algorithm
- [ ] Balance the game as needed
- [ ] Add more items, abilities, enemies, etc
- [ ] Design character and monster graphics
- [ ] Contact more consultants just to double check themes and designs