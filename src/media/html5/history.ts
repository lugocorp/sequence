import HistoryManager from '../history';

export default class HTML5HistoryManager extends HistoryManager {
    private entry: any;

    /**
     * Sets up initial state
     */
    async initialize(): Promise<void> {
        const that = this;
        this.clear();
        await new Promise<void>((resolve) => {
            try {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                    fs.root.getFile(
                        'abyayala.json',
                        { create: true, exclusive: false },
                        function (fileEntry) {
                            that.entry = fileEntry;
                            resolve();
                        }
                    );
                });
            } catch (e) {
                console.error(e, e.stack);
                resolve();
            }
        });
        await this.load();
    }

    /**
     * Writes save data to storage
     */
    async save(): Promise<void> {
        const that = this;
        if (!this.entry) {
            return;
        }
        return new Promise((resolve) => {
            that.entry.createWriter(function (writer) {
                writer.onwriteend = resolve;
                writer.write(JSON.stringify(that.runs));
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
