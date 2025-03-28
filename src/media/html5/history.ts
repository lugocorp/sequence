import HistoryManager from '../history';

export default class HTML5HistoryManager extends HistoryManager {
    private entry: any;

    /**
     * Sets up initial state
     */
    async initialize(): Promise<void> {
        const that = this;
        this.clear();
        if (window.cordova) {
            await new Promise<void>((resolve) => {
                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + 'abyayala.json', (file) => {
                    that.entry = file;
                    resolve();
                }, (e) => {
                    console.error(e);
                    resolve();
                });
            });
        }
        await this.load();
    }

    /**
     * Writes save data to storage
     */
    async save(): Promise<void> {
        if (!this.entry) {
            return;
        }
        return new Promise((resolve) => {
            this.entry.createWriter(function (writer) {
                writer.onwriteend = resolve;
                writer.write(JSON.stringify(this.runs));
            });
        });
    }

    /**
     * Reads save data from storage
     */
    protected async load(): Promise<void> {
        const that = this;
        this.runs = [];
        if (!this.entry) {
            return;
        }
        return new Promise((resolve) => {
            that.entry.file(function (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    try {
                        that.runs = JSON.parse(reader.result.toString());
                    } catch (e) {
                        console.error(e, e.stack);
                    }
                    resolve();
                };
                reader.readAsText(file);
            });
        });
    }
}
