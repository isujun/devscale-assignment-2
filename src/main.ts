import { fetchData } from "./libs/fetch";
import { INote } from "./types/entity";

interface INoteResult {
  data: INote[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/7Eg7yYwLkQ8u";

async function renderNotes() {
  const notes = await fetchData<INoteResult>(API_URL);

  if (!notes) {
    console.log("Aplikasi Error!");
    return;
  }
  notes.data.map((note) => {
    const newNote = document.createElement("div");
    const newTitle = document.createElement("h3");
    const newContentNote = document.createElement("p");

    newTitle.textContent = note.title;
    newContentNote.textContent = note.content;

    newNote.append(newTitle, newContentNote);
    document.body.append(newNote);
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
});
