import * as fs from "fs";

export default class Watcher {
  constructor(private filename: string) { }

  /**
   * Se pone a mirar los cambios del fichero que le pasemos
   */
  watch = () => {
    fs.access(this.filename, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${this.filename} does not exist`);
      } else {
        console.log(`Starting to watch file ${this.filename}`);

        fs.watch(this.filename).on("change", () => {
          console.log(`File ${this.filename} has been modified somehow`);
        });

        console.log(`File ${this.filename} is no longer watched`);
      }
    });
  };
}
