
export default class History {
  private entry: any;
  runs: [string, number][];

  /**
   * Sets up initial state
   */
  async initialize(): Promise<void> {
    const that = this;
    this.clear();
    await new Promise<void>((resolve) => {
      try {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          fs.root.getFile("abyayala.json", { create: true, exclusive: false }, function (fileEntry) {
            that.entry = fileEntry;
            resolve();
          });
        });
      } catch (e) {
        console.error(e, e.stack);
        resolve();
      }
    });
    await this.load();
  }

  /**
   * Resets state for a new game
   */
  clear(): void {
    // Set variables to zero here
  }

  /**
   * Calculates a score from internal state
   */
  private calculateScore(): number {
    return 100;
  }

  /**
   * Adds a new game score to the ledger
   */
  log(): void {
    let index: number = 0;
    const score: number = this.calculateScore();
    while (index < this.runs.length && score < this.runs[index][1]) {
      index++;
    }
    const date = new Date();
    this.runs.splice(index, 0, [`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, score]);
    while (this.runs.length > 9) {
      this.runs.pop();
    }
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
  private async load(): Promise<void> {
    const that = this;
    this.runs = [];
    if (!this.entry) {
      return;
    }
    return new Promise((resolve) => {
      that.entry.file(function (file) {
        const reader = new FileReader();
        reader.onloadend = function (evt) {
          try {
            that.runs = JSON.parse(reader.result.toString());
          } catch (e) {
            console.error(e, e.stack);
          }
          resolve();
        }
        reader.readAsText(file);
      });
    });
  }
}