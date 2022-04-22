"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yargs = require("yargs");
const noteManager_1 = require("./noteManager");
/**
 * Objeto que nos permitira ejecutar las diferentes funciones
 */
const noteManager = new noteManager_1.NoteManager();
/**
 * Comando add para añadir una nota
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note color',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
            typeof argv.body === 'string' && typeof argv.color === "string") {
            noteManager.addNote(argv.user, argv.title, argv.body, argv.color);
        }
        else {
            console.log(chalk.red('Argument invalid'));
        }
    },
});
/**
 * Comando modify para modificar una nota del usuario
 */
yargs.command({
    command: 'modify',
    describe: 'Modify a note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note color',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
            typeof argv.body === 'string' && typeof argv.color === 'string') {
            noteManager.modifyNote(argv.user, argv.title, argv.body, argv.color);
        }
        else {
            console.log(chalk.red('Argument invalid'));
        }
    },
});
/**
 * Comando read para leer una nota
 */
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            noteManager.readNote(argv.user, argv.title);
        }
        else {
            console.log(chalk.red('Argument invalid'));
        }
    },
});
/**
 * Comando list para ver las notas del usuario
 */
yargs.command({
    command: 'list',
    describe: 'List all note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            console.log(chalk.underline('Notas de ' + argv.user));
            noteManager.listNotes(argv.user);
        }
        else {
            console.log(chalk.red('Argument invalid'));
        }
    },
});
/**
 * Comando remove para eliminar una nota
 */
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            noteManager.removeNote(argv.user, argv.title);
        }
        else {
            console.log(chalk.red('Argument invalid'));
        }
    },
});
yargs.parse();
