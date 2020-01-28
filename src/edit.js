import { updateNote, removeNote } from "./notes";
import { initEditPage, generateLastEdited } from "./views";

const noteId = location.hash.substring(1);

const titleElement = document.querySelector("#note-title");
const lastEditedElement = document.querySelector("#last-edited");
const bodyElement = document.querySelector("#note-body");

initEditPage(noteId);

titleElement.addEventListener("input", e => {
    const note = updateNote(noteId, {
        title: e.target.value
    });

    debugger;

    lastEditedElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener("input", e => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    lastEditedElement.textContent = generateLastEdited(note.updatedAt);
});

document.querySelector("#remove-note").addEventListener("click", e => {
    removeNote(noteId);
    location.assign("/");
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        initEditPage(noteId);
    }
});