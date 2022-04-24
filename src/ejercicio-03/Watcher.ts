import * as fs from 'fs';

export default class Watcher {
  constructor(private user: string) {}
  watch = () => {
    fs.access(`./database/${this.user}/`, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`El usario ${this.user} no existe`)

      } else {
        console.log(`Vigilando las notas de ${this.user}:`)

        // Hace un seguimiento de la ruta
        fs.watch(`./database/${this.user}/`, (eventType, filename) => {
          console.log("\nEl fichero", filename, "ha cambiado!")
          console.log("El cambio fue de tipo:", eventType)
        })
      }
    })
  }
}