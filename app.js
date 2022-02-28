const container = document.querySelector(".container");
const addNoteBtn = document.querySelector(".add__new");

// Getting text note content from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    createNewNote(note);
  });
}

addNoteBtn.addEventListener("click", () => {
  createNewNote();
});

function createNewNote(note = "") {
  const newNote = document.createElement("div");
  newNote.classList.add("card");
  newNote.innerHTML = `
    <div class="header">
        <button class="delete"><ion-icon name="trash-outline"></ion-icon></button>
    </div>
        <textarea class="text" placeholder="Empty note..."></textarea>
    
  `;

  const deleteBtn = newNote.querySelector(".delete");
  const textAreaEl = newNote.querySelector(".text");

  textAreaEl.value = note;
  deleteBtn.addEventListener("click", () => {
    newNote.remove();
    updateStorage();
  });

  textAreaEl.addEventListener("input", () => {
    updateStorage();
  });

  container.insertBefore(newNote, addNoteBtn);
}

function updateStorage() {
  const notesText = document.querySelectorAll("textarea");

  const notesArr = [];
  notesText.forEach((note) => {
    notesArr.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notesArr));
}
