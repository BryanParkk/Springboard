document.addEventListener("DOMContentLoaded", function () {
  const noteContainer = document.getElementById("note-container");
  const newNoteButton = document.getElementById("new-note-button");
  const colorForm = document.getElementById("color-form");
  const colorInput = document.getElementById("color-input");
  let noteColor = localStorage.getItem("noteColor") || "#ffffff"; // Default color

  // Load the notes from the local storage.
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  // Load the notes from the local storage.
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  let noteIdCounter =
    savedNotes.length > 0
      ? Math.max(...savedNotes.map((note) => note.id)) + 1
      : 0; // Counter for assigning unique IDs to new notes.
  savedNotes.forEach((noteData) => {
    const note = document.createElement("textarea");
    note.setAttribute("data-note-id", noteData.id);
    note.value = noteData.content;
    note.className = "note";
    note.style.backgroundColor = noteData.color;
    noteContainer.appendChild(note);
  });

  function addNewNote() {
    const id = noteIdCounter;
    const content = `Note ${id}`;

    // Add new note to the saved notes in the local storage.
    // Remove duplicate code
    note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
    const note = document.createElement("textarea");
    note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.

    noteIdCounter++; // Increments the counter since the ID is used for this note.
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push({ id, content, color: noteColor });
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }

  colorForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default event.

    const newColor = colorInput.value.trim(); // Removes whitespaces.

    const notes = document.querySelectorAll(".note");
    for (const note of notes) {
      note.style.backgroundColor = newColor;
    }

    colorInput.value = ""; // Clears the color input field after from submission.

    colorInput.value = ""; // Clears the color input field after form submission.

    // Update the note color in the local storage.
    localStorage.setItem("noteColor", newColor);
  });

  newNoteButton.addEventListener("click", function () {
    addNewNote();
  });

  document.addEventListener("dblclick", function (event) {
    if (event.target.classList.contains("note")) {
      event.target.remove(); // Removes the clicked note.

      // Delete the note from the saved notes in the local storage.
      const noteId = event.target.getAttribute("data-note-id");
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = savedNotes.filter(
        (note) => note.id !== parseInt(noteId)
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  });

  noteContainer.addEventListener(
    "blur",
    function (event) {
      if (event.target.classList.contains("note")) {
        // Update the note from the saved notes in the local storage.
        const noteId = event.target.getAttribute("data-note-id");
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const noteIndex = savedNotes.findIndex(
          (note) => note.id === parseInt(noteId)
        );
        if (noteIndex !== -1) {
          savedNotes[noteIndex].content = event.target.value;
          localStorage.setItem("notes", JSON.stringify(savedNotes));
        }
      }
    },
    true
  );

  window.addEventListener("keydown", function (event) {
    /* Ignores key presses made for color and note content inputs. */
    if (event.target.id === "color-input" || event.target.type === "textarea") {
      return;
    }

    /* Adds a new note when the "n" key is pressed. */
    if (event.key === "n" || event.key === "N") {
      addNewNote(); // Adds a new note.
    }
  });
});
