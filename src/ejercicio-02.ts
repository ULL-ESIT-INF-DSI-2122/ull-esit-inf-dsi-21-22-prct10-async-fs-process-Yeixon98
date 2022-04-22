import { spawn } from 'child_process';
import { access, constants, watch } from 'fs';

if (process.argv.length < 4) {
  console.log('---------- Help ----------');
  console.log('First Argument Path File');
  console.log('Second Argument Word Find');
  console.log('Third Argument Method (Pipe) Optional');
  console.log("-------- Example --------");
  console.log("node file.js ./my/file myWord myMethod");  
} else {
  const path = process.argv[2];
  const word = process.argv[3];
  const method = process.argv[4] ? process.argv[4] : "Sin Pipe"
  console.clear()
  console.log("Ruta: ", path);
  console.log("Palabra: ", word);
  console.log("Metodo: ", method);

  access(path, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${path} does not exist`);
    } else {
      if (method === "Pipe") {
        // Codigo con pipe
        let stringData = ""
        const cat = spawn('cat', [path]);
        const grep = spawn('grep', [word])
        cat.stdout.pipe(grep.stdin);
        grep.stdout.on("data", (data)=>{
          stringData += data
        })
        grep.stderr.on('data', (data) => {
          console.error(`grep stderr: ${data}`)
        })
        grep.on('close', () => {
          console.log(stringData)
          const arrayStringData = stringData.split(" ")
          const result = arrayStringData.filter(oneWord => oneWord === word).length
          console.log("La palabra " + word + " tiene un ocurrencia de " + result)
          return result
        })


      }
      else {
        //Codigo sin pipe
        // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
        let stringData = ""
        const cat = spawn('cat', [path])
        const grep = spawn('grep', [word])

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
          const result = arrayStringData.filter(oneWord => oneWord === word).length
          console.log("La palabra " + word + " tiene un ocurrencia de " + result)
          return result
        })
      }
    }
  });
}