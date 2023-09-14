import GameAudio from '../audio';

export default class HTML5GameAudio extends GameAudio {
    private assets: HTMLAudioElement[];
    private paths: string[] = [ 'startup.wav', 'option.wav', 'arrow.wav', 'gameover.wav' ];

    // Loads all audio assets specified in this file
    async loadAudio(): Promise<void> {
        const that = this;
        this.assets = new Array(this.paths.length);
        await Promise.all(
            this.paths.map(
                (path: string, index: number) =>
                    new Promise((resolve) => {
                        that.assets[index] = new Audio();
                        that.assets[index].src = `./assets/${path}`;
                        that.assets[index].addEventListener('canplaythrough', resolve);
                    })
            )
        );
    }

    // Plays a specific sound managed by this class
    play(index: number): void {
        this.assets[index].pause();
        this.assets[index].currentTime = 0;
        this.assets[index].play();
    }
}
