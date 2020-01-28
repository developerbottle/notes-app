import uuid from "uuid/v4";
import moment from "moment";

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");

    try {
        return notesJSON? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
    const id = uuid();
    const now = moment().valueOf();

    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: now,
        updatedAt: now
    });

    saveNotes();

    return id;
};

const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};

const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((note1, note2) => {
            if (note1.updatedAt > note2.updatedAt) {
                return -1;
            } else if (note1.updatedAt < note2.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((note1, note2) => {
            if (note1.createdAt > note2.createdAt) {
                return -1;
            } else if (note1.createdAt < note2.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "alphabetical") {
        return notes.sort((note1, note2) => {
            if (note1.title.toLowerCase() > note2.title.toLowerCase()) {
                return 1;
            } else if (note1.title.toLowerCase() < note2.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    }
};

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id);

    if (!note) return;

    if (typeof updates.title === "string") {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    }

    if (typeof updates.body === "string") {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    }

    saveNotes();

    return note;
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote }