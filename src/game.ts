
export default class Game {
    start() {
        const canvas = document.getElementById('canvas');
        (canvas as any).height = 100;
        (canvas as any).width = 100;
    }
}