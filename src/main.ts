import { fetchData } from "./libs/fetch";
import { INoteResult } from "./types/entity";

const API_URL = "https://v1.appbackend.io/v1/rows/7Eg7yYwLkQ8u";

async function renderNotes() {
  const notes = await fetchData<INoteResult>(API_URL);

  if (!notes) {
    console.log("Aplikasi Error!");
    return;
  }

  const listContainer = document.getElementById("list-container") as HTMLDivElement;

  notes.data.map((note) => {
    listContainer.innerHTML += `
      <div class="container">
        <div class="note">
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <div class="containerBtn">
            <button id="deleteBtn"><span>Delete </span></button>
          </div>
        </div>
      </div>
        `;
    const deleteBtn = document.getElementById("deleteBtn") as HTMLButtonElement;

    deleteBtn.addEventListener("click", () => deleteNote(note._id));
  });
}

renderNotes();

// create new notes
const titleInput = document.getElementById("title") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn");

submitBtn?.addEventListener("click", async () => {
  const title = titleInput.value;
  const content = contentInput.value;
  createNote(title, content);
});

// func delete
async function deleteNote(noteId: string) {
  try {
    await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([noteId]),
    });
  } catch (error) {
    console.log("error", error);
  } finally {
    window.location.reload();
  }
}

// func create
async function createNote(title: string, content: string) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, content }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
}
