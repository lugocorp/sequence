export default abstract class GameAudio {
    static STARTUP = 0;
    static OPTION = 1;
    static ARROW = 2;
    static FAIL = 3;

    abstract loadAudio(): Promise<void>;
    abstract play(index: number): void;
}
