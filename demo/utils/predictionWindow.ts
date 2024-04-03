class PredictionWindow {
  predictions: Array<string> = [];
  occurencesDict: { [key: string]: number } = {};
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  append(dir: string) {
    if (this.predictions.length + 1 <= this.size) {
      this.predictions.push(dir);
    } else {
      const removedDir = this.predictions.shift()!;
      this.predictions.push(dir);

      this.occurencesDict[removedDir] -= 1;
    }

    if (this.occurencesDict.hasOwnProperty(dir)) this.occurencesDict[dir] += 1;
    else this.occurencesDict[dir] = 1;
  }

  clear() {
    this.predictions = [];
    this.occurencesDict = {};
  }

  getMostFrequentDirection(): string | null {
    const entries = Object.entries(this.occurencesDict);
    if (entries.length === 0) return null;

    let mostFrequentDir: [string, number] = entries[0];

    for (let i = 1; i < entries.length; i++) {
      const [key, value] = entries[i];
      if (value > mostFrequentDir[1]) mostFrequentDir = entries[i];
    }

    return mostFrequentDir[0];
  }
}

export default PredictionWindow;
