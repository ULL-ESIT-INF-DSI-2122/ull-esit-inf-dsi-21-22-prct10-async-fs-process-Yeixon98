import { access, constants, watch } from 'fs'

/**
 * Detecta cambios en el fichero que se le pasa como argumento
 */
if (process.argv.length !== 3) {
  console.log('Please, specify a file')
} else {
  const filename = process.argv[2]

  // Comprueba si tengo acceso a dicho fichero
  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`)
    } else {
      console.log(`Starting to watch file ${filename}`)

      const watcher = watch(process.argv[2])

      // Evento de cambio
      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`)
      })

      console.log(`File ${filename} is no longer watched`)
    }
  })
}