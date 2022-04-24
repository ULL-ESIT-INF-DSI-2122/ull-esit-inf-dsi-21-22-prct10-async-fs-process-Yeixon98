import Commands from "./Commands";

const commands = new Commands();

if (process.argv.length < 3) {
  commands.help();
} else if (process.argv[3] === undefined) {
  console.log("Indique una ruta");
} else {
  switch (process.argv[2]) {
    case "check":
      commands.check(process.argv[3]);
      break;

    case "mkdir":
      commands.mkdir(process.argv[3]);
      break;

    case "ll":
      commands.ll(process.argv[3]);
      break;

    case "cat":
      commands.cat(process.argv[3]);
      break;

    case "rm":
      commands.rm(process.argv[3]);
      break;

    case "mv":
      if (process.argv[4] === undefined) {
        console.log("Indique una ruta destino");
      } else {
        commands.mv(process.argv[3], process.argv[4]);
      }
      break;

    case "cp":
      if (process.argv[4] === undefined) {
        console.log("Indique una ruta destino");
      } else {
        commands.cp(process.argv[3], process.argv[4]);
      }
      break;

    default:
      console.log("Comando no implementado, prube con help");
      break;
  }
}
