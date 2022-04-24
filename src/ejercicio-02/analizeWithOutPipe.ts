import { spawn } from "child_process";
import * as fs from "fs";

// https://nodejs.org/api/child_process.html#child_processspawncommand-args-options

export default class AnalizeWithOutPipe {
  constructor(private path: string, private word: string) {}
  exec = () => {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${this.path} does not exist`);
      } else {
        let stringData = ""
        const cat = spawn('cat', [this.path])
        const grep = spawn('grep', [this.word])

        // Lee el fichero y mediante el evento onData obtengo la info
        cat.stdout.on('data', (data) => {
          grep.stdin.write(data)
        })
        cat.stderr.on('data', (data) => {
          console.error(`cat stderr: ${data}`)
        })
        cat.on('close', () => {
          grep.stdin.end()
        })

        grep.stdout.on('data', (data) => {
          stringData += data
        })
        grep.stderr.on('data', (data) => {
          console.error(`grep stderr: ${data}`)
        })
        grep.on('close', () => {
          console.log(stringData)
          const arrayStringData = stringData.split(" ")
          const result = arrayStringData.filter(oneWord => oneWord === this.word).length
          console.log("La palabra " + this.word + " tiene un ocurrencia de " + result)
          return result
        })
      }
    });
  };
}
