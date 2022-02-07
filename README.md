# Sequence Dungeons

## Commands
We have a number of `npm` commands:
- `start` runs the game server and listens for code changes
- `compile` builds all the TypeScript code
- `lint` lints the project

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
- [x] Rewrite click propogation to include on click down and click up (reuse coordinates from click down, this is for graphical feedback)
- [x] Bring the encounter event UI together
- [x] Implement the loot event
- [ ] Implement the treasure event
- [ ] Copy the encounter event for a boss event

#### Advanced gameplay
- [ ] Add the trainer event
- [ ] Add the trickster and guardian events
- [ ] Add the good omen event
- [ ] Add the assassination event
- [ ] Add the recruitment event
- [ ] Add the merchant event
- [ ] Code the basic event progression algorithm
- [ ] Implement a lose state
- [ ] Create a game data compiler that checks the data folder for illegal values
- [ ] Add views for loading, instructions, credits, and game start
