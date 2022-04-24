import { spawn } from "child_process";
import * as fs from "fs";

/**
 * Clase Commands que contiene todas las funciones solicitadas en el ejercicio 4
 */
export default class Commands {
  /**
   * Metodo que muestra la ayuda
   */
  help = () => {
    console.clear();
    console.log("Comandos implementados:");
    console.log("check path - Compruba si path es un fichero o directorio.");
    console.log("mkdir path - Crea un directorio en el path.");
    console.log("ll path - Lista los ficheros dentro del path.");
    console.log(
      "cat path - Muestra el contenido del fichero que indica el path."
    );
    console.log("rm path - Borra lo que indique el path");
    console.log(
      "mv path_origen path_destino - Mueve el contenido del path_origen a path_destino."
    );
    console.log(
      "cp path_origen path_destino - Copia el contenido del path_origen a path_destino."
    );
  };

  /**
   * Comprueba si ruta pasada es un directorio o un fichero
   * @param path Ruta
   */
  check = (path: string) => {
    const check = spawn("ls", ["-ld", path]);
    let resCheck = "";
    check.stdout.on("data", (piece) => (resCheck += piece));

    check.on("close", () => {
      if (resCheck[0] === "-") {
        console.clear();
        console.log(path + " es un fichero");
      } else {
        console.clear();
        console.log(path + " es un directorio");
      }
    });
  };

  /**
   * Crea una carpeta en la ruta especificada
   * @param path Ruta
   */
  mkdir = (path: string) => {
    spawn("mkdir", [path]);
    console.clear();
    console.log("Directorio creado");
  };

  /**
   * Lista el contenido de la ruta
   * @param path Ruta
   */
  ll = (path: string) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`${path} no existe`);
      } else {
        const ll = spawn("ls", ["-l", path]);
        console.clear();
        ll.stdout.pipe(process.stdout);
      }
    });
  };

  /**
   * Se muestra el contenido de lo pasado por path
   * @param path Ruta
   */
  cat = (path: string) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`Fichero ${path} no existe`);
      } else {
        const ls = spawn("cat", [path]);
        console.clear();
        ls.stdout.pipe(process.stdout);
      }
    });
  };

  /**
   * Borra lo que haya en la ruta
   * @param path Ruta
   */
  rm = (path: string) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`${path} no existe`);
      } else {
        spawn("rm", ["-rf", path]);
        console.clear();
        console.log(path + " eliminado");
      }
    });
  };

  /**
   * Mueve el contenido de la ruta origen a la ruta destino
   * @param pathOrigin Ruta Origen
   * @param pathDestiny Ruta Destino
   */
  mv = (pathOrigin: string, pathDestiny: string) => {
    fs.access(pathOrigin, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`La ruta ${pathOrigin} no existe`);
      } else {
        fs.access(pathDestiny, fs.constants.F_OK, (err_) => {
          if (err_) {
            console.clear();
            console.log(`La ruta ${pathDestiny} no existe`);
          } else {
            // Para obtener si la ruta origen es un directorio o fichero
            const checkOne = spawn("ls", ["-ld", pathOrigin]);
            let checkPathOne = "";
            checkOne.stdout.on("data", (piece) => (checkPathOne += piece));

            checkOne.on("close", () => {
              // Para obtener si la ruta destino es un directorio o fichero
              const checkTwo = spawn("ls", ["-ld", pathDestiny]);
              let checkPathTwo = "";
              checkTwo.stdout.on("data", (piece) => (checkPathTwo += piece));

              checkTwo.on("close", () => {
                // Una vez sabemos que son podemos decidir segun la condicion
                if (checkPathOne[0] === "d" && checkPathTwo[0] === "-") {
                  console.clear();
                  console.log("No se puedo mover un directorio a un fichero");
                } else {
                  spawn("mv", [pathOrigin, pathDestiny]);
                  console.clear();
                  console.log("Operacion realizada");
                }
              });
            });
          }
        });
      }
    });
  };

  /**
   * Copia el contenido de la ruta origen a la ruta destino
   * @param pathOrigin Ruta Origen
   * @param pathDestiny Ruta Destino
   */
  cp = (pathOrigin: string, pathDestiny: string) => {
    fs.access(pathOrigin, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`La ruta ${pathOrigin} no existe`);
      } else {
        fs.access(pathDestiny, fs.constants.F_OK, (err_) => {
          if (err_) {
            console.clear();
            console.log(`La ruta ${pathDestiny} no existe`);
          } else {
            // Para obtener si la ruta origen es un directorio o fichero
            const checkOne = spawn("ls", ["-ld", pathOrigin]);
            let checkPathOne = "";
            checkOne.stdout.on("data", (piece) => (checkPathOne += piece));

            checkOne.on("close", () => {
              // Para obtener si la ruta destino es un directorio o fichero
              const checkTwo = spawn("ls", ["-ld", pathDestiny]);
              let checkPathTwo = "";
              checkTwo.stdout.on("data", (piece) => (checkPathTwo += piece));

              checkTwo.on("close", () => {
                // Una vez sabemos que son podemos decidir segun la condicion
                if (checkPathOne[0] === "d" && checkPathTwo[0] === "-") {
                  console.clear();
                  console.log("No se puedo mover un directorio a un fichero");
                } else {
                  spawn("cp", ["-r", pathOrigin, pathDestiny]);
                  console.clear();
                  console.log("Operacion realizada");
                }
              });
            });
          }
        });
      }
    });
  };
}
