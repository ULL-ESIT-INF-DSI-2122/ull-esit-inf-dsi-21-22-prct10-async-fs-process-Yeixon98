import Watcher from "./Watcher";

if (process.argv.length !== 3) {
  console.log("Please, specify a file");
} else {
  const filename = process.argv[2];
  new Watcher(filename).watch();
}
