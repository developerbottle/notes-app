import {createNote} from "./notes";
import {setFilters} from "./filters";
import {renderNotes} from "./views";

renderNotes();

document.querySelector("#create-note").addEventListener("click", e => {
    location.assign(`/edit.html#${createNote()}`);
});

document.querySelector("#search-text").addEventListener("input", e => {
    setFilters({
        searchText: e.target.value
    });
    renderNotes();
});

document.querySelector("#sort-by").addEventListener("change", e => {
    setFilters({
        sortBy: e.target.value
    });
    renderNotes();
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        renderNotes();
    }
});