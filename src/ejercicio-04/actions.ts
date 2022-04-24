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
    let res_check = "";
    check.stdout.on("data", (piece) => (res_check += piece));

    check.on("close", () => {
      if (res_check[0] == "-") {
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
   * Lista todo el contenido de la ruta
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
   * @param path_o Ruta Origen
   * @param path_d Ruta Destino
   */
  mv = (path_o: string, path_d: string) => {
    fs.access(path_o, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`La ruta ${path_o} no existe`);
      } else {
        fs.access(path_d, fs.constants.F_OK, (err) => {
          if (err) {
            console.clear();
            console.log(`La ruta ${path_d} no existe`);
          } else {
            // Para obtener si la ruta origen es un directorio o fichero
            const check_1 = spawn("ls", ["-ld", path_o]);
            let check_path_1 = "";
            check_1.stdout.on("data", (piece) => (check_path_1 += piece));

            check_1.on("close", () => {
              // Para obtener si la ruta destino es un directorio o fichero
              const check_2 = spawn("ls", ["-ld", path_d]);
              let check_path_2 = "";
              check_2.stdout.on("data", (piece) => (check_path_2 += piece));

              check_2.on("close", () => {
                // Una vez sabemos que son podemos decidir segun la condicion
                if (check_path_1[0] == "d" && check_path_2[0] == "-") {
                  console.clear();
                  console.log("No se puedo mover un directorio a un fichero");
                } else {
                  spawn("mv", [path_o, path_d]);
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
   * @param path_o Ruta Origen
   * @param path_d Ruta Destino
   */
  cp = (path_o: string, path_d: string) => {
    fs.access(path_o, fs.constants.F_OK, (err) => {
      if (err) {
        console.clear();
        console.log(`La ruta ${path_o} no existe`);
      } else {
        fs.access(path_d, fs.constants.F_OK, (err) => {
          if (err) {
            console.clear();
            console.log(`La ruta ${path_d} no existe`);
          } else {
            // Para obtener si la ruta origen es un directorio o fichero
            const check_1 = spawn("ls", ["-ld", path_o]);
            let check_path_1 = "";
            check_1.stdout.on("data", (piece) => (check_path_1 += piece));

            check_1.on("close", () => {
              // Para obtener si la ruta destino es un directorio o fichero
              const check_2 = spawn("ls", ["-ld", path_d]);
              let check_path_2 = "";
              check_2.stdout.on("data", (piece) => (check_path_2 += piece));

              check_2.on("close", () => {
                // Una vez sabemos que son podemos decidir segun la condicion
                if (check_path_1[0] == "d" && check_path_2[0] == "-") {
                  console.clear();
                  console.log("No se puedo mover un directorio a un fichero");
                } else {
                  spawn("cp", ["-r", path_o, path_d]);
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
