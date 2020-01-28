import moment from "moment";
import {getNotes, sortNotes} from "./notes";
import { getFilters } from "./filters";

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement("a");
    noteElement.classList.add("list-item");
    noteElement.href = `/edit.html#${note.id}`;

    // Setup the note title text
    const textElement = document.createElement("p");
    if (note.title.length > 0) {
        textElement.textContent = note.title;
    } else {
        textElement.textContent = "Unnamed note";
    }
    textElement.classList.add("list-item__title");
    noteElement.appendChild(textElement);

    // Setup the status message
    const statusElement = document.createElement("p");
    statusElement.textContent = generateLastEdited(note.updatedAt);
    statusElement.classList.add("list-item__subtitle");

    noteElement.appendChild(statusElement);
    return noteElement;
};

// Render application notes
const renderNotes = () => {
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);

    const notesBlock = document.querySelector("#notes");

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesBlock.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            notesBlock.appendChild(generateNoteDOM(note));
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show";
        emptyMessage.classList.add("empty-message");
        notesBlock.appendChild(emptyMessage);
    }
};

const initEditPage = (noteId) => {
    const titleElement = document.querySelector("#note-title");
    const bodyElement = document.querySelector("#note-body");
    const lastEditedElement = document.querySelector("#last-edited");

    const note = getNotes().find((note) => note.id === noteId);
    if (!note) {
        location.assign("/");
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastEditedElement.textContent = generateLastEdited(note.updatedAt);
};

const generateLastEdited = (updatedAt) => {
    return `Last Edited: ${moment(updatedAt).fromNow()}`;
};

export { generateNoteDOM, renderNotes, generateLastEdited, initEditPage };