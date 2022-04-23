import { spawn } from 'child_process'
import { access, constants } from 'fs'

if (process.argv.length < 3) {
  console.log("Use help para la ayuda")
}
else {
  switch (process.argv[2]) {
    // Lista la ayuda
    case 'help':
      console.clear()
      console.log("Comandos implementados:")
      console.log("check path - Compruba si path es un fichero o directorio.")
      console.log("mkdir path - Crea un directorio en el path.")
      console.log("ll path - Lista los ficheros dentro del path.")
      console.log("cat path - Muestra el contenido del fichero que indica el path.")
      console.log("rm path - Borra lo que indique el path")
      console.log("mv path_origen path_destino - Mueve el contenido del path_origen a path_destino.")
      console.log("cp path_origen path_destino - Copia el contenido del path_origen a path_destino.")
      break
    // --------------------------------------------------

    // Comprueba si es un fichero o directorio
    case 'check':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta")
      }
      else {
        const check = spawn('ls', ['-ld', process.argv[3]])

        let res_check = ''
        check.stdout.on('data', (piece) => res_check += piece)

        check.on('close', () => {
          if (res_check[0] == '-') {
            console.log(process.argv[3] + " es un fichero")
          }
          else {
            console.log(process.argv[3] + " es un directorio")
          }
        })
      }
      break
    // --------------------------------------------------------

    // Crea un directorio en la ruta 
    case 'mkdir':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta")
      }
      else {
        spawn('mkdir', [process.argv[3]])
        console.log("Directorio creado")
      }
      break
    // ------------------------------------------------

    // Lista los ficheros dentro de un directorio
    case 'll':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta")
      }
      else {
        access(process.argv[3], constants.F_OK, (err) => {
          if (err) {
            console.log(`Fichero ${process.argv[3]} no existe`)
          } else {
            const ll = spawn('ls', ['-l', process.argv[3]])
            ll.stdout.pipe(process.stdout)
          }
        })
      }
      break
    // ------------------------------------------------

    // Muestra el conteido de un fichero
    case 'cat':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta")
      }
      else {
        access(process.argv[3], constants.F_OK, (err) => {
          if (err) {
            console.log(`Fichero ${process.argv[3]} no existe`)
          } else {
            const ls = spawn('cat', [process.argv[3]])
            ls.stdout.pipe(process.stdout)
          }
        })
      }
      break
    // ------------------------------------------------

    // Elimina el contenido de la ruta indicada
    case 'rm':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta")
      }
      else {
        access(process.argv[3], constants.F_OK, (err) => {
          if (err) {
            console.log(`Fichero ${process.argv[3]} no existe`)
          } else {
            spawn('rm', ['-rf', process.argv[3]])
            console.log(process.argv[3] + " eliminado")
          }
        })
      }
      break
    // ------------------------------------------------

    // Mueve ficheros o directorios hacia un directorio
    case 'mv':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta origen")
      }
      else if (process.argv[4] == undefined) {
        console.log("Indique una ruta destino")
      }
      else {
        access(process.argv[3], constants.F_OK, (err) => {
          if (err) {
            console.log(`La ruta ${process.argv[3]} no existe`)
          } else {
            access(process.argv[4], constants.F_OK, (err) => {
              if (err) {
                console.log(`La ruta ${process.argv[4]} no existe`)
              } else {
                // Para obtener si la ruta origen es un directorio o fichero
                const check_1 = spawn('ls', ['-ld', process.argv[3]])
                let check_path_1 = ''
                check_1.stdout.on('data', (piece) => check_path_1 += piece)

                check_1.on('close', () => {

                  // Para obtener si la ruta destino es un directorio o fichero
                  const check_2 = spawn('ls', ['-ld', process.argv[4]])
                  let check_path_2 = ''
                  check_2.stdout.on('data', (piece) => check_path_2 += piece)

                  check_2.on('close', () => {

                    // Una vez sabemos que son podemos decidir segun la condicion
                    if ((check_path_1[0] == 'd') && (check_path_2[0] == '-')) {
                      console.log("No se puedo mover un directorio a un fichero")
                    }
                    else {
                      spawn('mv', [process.argv[3], process.argv[4]])
                      console.log("Operacion realizada")
                    }
                  })
                })
              }
            })
          }
        })
      }
      break
    // ------------------------------------------------

    // Copia ficheros o directorios hacia un directorio
    case 'cp':
      if (process.argv[3] == undefined) {
        console.log("Indique una ruta origen")
      }
      else if (process.argv[4] == undefined) {
        console.log("Indique una ruta destino")
      }
      else {
        access(process.argv[3], constants.F_OK, (err) => {
          if (err) {
            console.log(`La ruta ${process.argv[3]} no existe`)
          } else {
            access(process.argv[4], constants.F_OK, (err) => {
              if (err) {
                console.log(`La ruta ${process.argv[4]} no existe`)
              } else {
                // Para obtener si la ruta origen es un directorio o fichero
                const check_1 = spawn('ls', ['-ld', process.argv[3]])
                let check_path_1 = ''
                check_1.stdout.on('data', (piece) => check_path_1 += piece)

                check_1.on('close', () => {

                  // Para obtener si la ruta destino es un directorio o fichero
                  const check_2 = spawn('ls', ['-ld', process.argv[4]])
                  let check_path_2 = ''
                  check_2.stdout.on('data', (piece) => check_path_2 += piece)

                  check_2.on('close', () => {

                    // Una vez sabemos que son podemos decidir segun la condicion
                    if ((check_path_1[0] == 'd') && (check_path_2[0] == '-')) {
                      console.log("No se puedo mover un directorio a un fichero")
                    }
                    else {
                      spawn('cp', ['-r', process.argv[3], process.argv[4]])
                      console.log("Operacion realizada")
                    }
                  })
                })
              }
            })
          }
        })
      }
      break
    // ------------------------------------------------

    // en caso de que indique un argumento invalido
    default:
      console.log("Comando no implementado, prube con help")
      break
  }
}


/**
 * TODO: Agrupar el codigo en funciones para que sea mas facil entenderlo
 */