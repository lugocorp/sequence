
export default class History {
  private entry: any;
  runs: [string, number][];

  async initialize(): Promise<void> {
    const that = this;
    await new Promise<void>((resolve) => {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile("abyayala.json", { create: true, exclusive: false }, function (fileEntry) {
            that.entry = fileEntry;
            resolve();
        });
      });
    });
    await this.load();
  }

  log(score: number): void {
    let index: number = 0;
    while (index < this.runs.length && score < this.runs[index][1]) {
      index++;
    }
    const date = new Date();
    this.runs.splice(index, 0, [`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, score]);
    while (this.runs.length > 9) {
      this.runs.pop();
    }
  }

  async save(): Promise<void> {
    const that = this;
    return new Promise((resolve) => {
      that.entry.createWriter(function (writer) {
        writer.onwriteend = resolve;
        writer.write(JSON.stringify(that.runs));
      });
    });
  }

  async load(): Promise<void> {
    const that = this;
    return new Promise((resolve) => {
      that.entry.file(function (file) {
        const reader = new FileReader();
        reader.onloadend = function (evt) {
          try {
            that.runs = JSON.parse(reader.result.toString());
          } catch (e) {
            that.runs = [];
          }
          resolve();
        }
        reader.readAsText(file);
      });
    });
  }
}