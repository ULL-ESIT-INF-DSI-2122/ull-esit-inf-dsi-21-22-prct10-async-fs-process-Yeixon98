import AnalizeWithPipe from "./analizeWithPipe";
import AnalizeWithOutPipe from "./analizeWithOutPipe";

if (process.argv.length < 4) {
  console.log("---------- Help ----------");
  console.log("First Argument Path File");
  console.log("Second Argument Word Find");
  console.log("Third Argument Method (Pipe) Optional");
  console.log("-------- Example --------");
  console.log("node file.js ./my/file myWord myMethod");
} else {
  const path = process.argv[2];
  const word = process.argv[3];
  const method = process.argv[4] ? process.argv[4] : "Sin Pipe";
  console.clear();
  console.log("Ruta: ", path);
  console.log("Palabra: ", word);
  console.log("Metodo: ", method);

  if (method === "Pipe") {
    new AnalizeWithPipe(path, word).exec();
  } else {
    new AnalizeWithOutPipe(path, word).exec();
  }
}
