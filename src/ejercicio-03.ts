import { access, constants, watch } from 'fs'

// Comprueba que se le pasa un parametro
if (process.argv[2] == undefined) {
  console.log("Indique un Usuario.")
}
else {
<<<<<<< HEAD
  // Comprueba que la ruta existe
  access(`./database/${process.argv[2]}/`, constants.F_OK, (err) => {
    if (err) {
      console.log(`El usario ${process.argv[2]} no existe`)
    } else {
      console.log(`Vigilando las notas de ${process.argv[2]}:`)
      // Hace un seguimiento de la ruta
      watch(`./database/${process.argv[2]}/`, (eventType, filename) => {
        console.log("\nEl fichero", filename, "ha cambiado!")
        console.log("El cambio fue de tipo:", eventType)
      })
    }
  })
=======
    // Comprueba que la ruta existe
    access(`/root/DSI/P-09/database/${process.argv[2]}/`, constants.F_OK, (err) => {
        if (err) {
        console.log(`El usario ${process.argv[2]} no existe`);
        } else {
            console.log(`Vigilando las notas de ${process.argv[2]}:`)
            // Hace un seguimiento de la ruta
            watch(`/root/DSI/P-09/database/${process.argv[2]}/`, (eventType, filename) => {
                console.log("\nEl fichero", filename, "ha cambiado!");
                console.log("El cambio fue de tipo:", eventType);
            })
        }
    });
>>>>>>> parent of 4f6c5d0... Add P-09 for testing Exercise 3
}