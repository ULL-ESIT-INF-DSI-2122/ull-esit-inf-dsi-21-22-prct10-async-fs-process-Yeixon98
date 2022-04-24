"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
/**
 * Clase que representa una nota
 */
class Note {
    /**
     * Constructor de la clase
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     */
    constructor(title, body, color) {
        this.title = title;
        this.body = body;
        this.color = color;
    }
    /**
     * Se obtiene el titulo de la nota
     * @returns Titulo de la nota
     */
    getTitle() {
        return this.title;
    }
    /**
     * Se obtiene el contenido de la nota
     * @returns Contenido de la nota
     */
    getBody() {
        return this.body;
    }
    /**
     * Se obtiene el color de la nota
     * @returns Color de la nota
     */
    getColor() {
        return this.color;
    }
    /**
     * Escribir la nota en formato JSON
     * @returns Nota en formato JSON
     */
    print() {
        return '{\n\"title\": \"' + this.title +
            '\",\n\"body\": \"' + this.body +
            '\",\n\"color\": \"' + this.color + '\"\n}';
    }
}
exports.Note = Note;
