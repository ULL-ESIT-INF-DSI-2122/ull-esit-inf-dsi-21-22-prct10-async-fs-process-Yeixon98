import Watcher from "./Watcher";

if (process.argv[2] == undefined) {
  console.log("Indique un Usuario.");
} else {
  new Watcher(process.argv[2]).watch()
}
