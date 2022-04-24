import Commands from './actions';

if (process.argv.length < 3) {
    console.log("Use help para la ayuda");
}
else {
  const commands = new Commands()
  switch (process.argv[2]) {
    // Lista la ayuda
    case 'help':
      commands.help()
    break;

    // Comprueba si es un fichero o directorio
    case 'check':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta");
      }
      else {
        commands.check(process.argv[3])
      }
    break;

    // Crea un directorio en la ruta 
    case 'mkdir':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta");
      }
      else {
        commands.mkdir(process.argv[3])
      }
    break;

    // Lista los ficheros dentro de un directorio
    case 'll':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta");
      }
      else {
        commands.ll(process.argv[3])
      }
    break;

    // Muestra el conteido de un fichero
    case 'cat':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta");
      }
      else {
        commands.cat(process.argv[3])
      }
    break;

    // Elimina el contenido de la ruta indicada
    case 'rm':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta");
      }
      else {
        commands.rm(process.argv[3])
      }
    break;

    // Mueve ficheros o directorios hacia un directorio
    case 'mv':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta origen");
      }
      else if(process.argv[4] == undefined) {
        console.log("Indique una ruta destino");
      }
      else {
        commands.mv(process.argv[3], process.argv[4])
      }
    break;

    // Copia ficheros o directorios hacia un directorio
    case 'cp':
      if(process.argv[3] == undefined) {
        console.log("Indique una ruta origen");
      }
      else if(process.argv[4] == undefined) {
        console.log("Indique una ruta destino");
      }
      else {
        commands.cp(process.argv[3], process.argv[4])
      }
    break;

    // en caso de que indique un argumento invalido
    default:
      console.log("Comando no implementado, prube con help")
    break;
  }
}