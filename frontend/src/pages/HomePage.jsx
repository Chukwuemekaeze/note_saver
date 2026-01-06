import { FiEdit3, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/api.js";
import NoteItem from "../components/notes/NoteItem.jsx";
import Pagination from "../components/notes/Pagination.jsx";

function HomePage() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Effect 1: Load notes
  useEffect(() => {
    const loadNotes = async (page) => {
      try {
        const data = await fetchNotes(page);
        setNotes(data.notes);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadNotes(currentPage);
  }, [currentPage]);

  // Handler: Add note
  const handleAddNote = async () => {
    // Prevent adding empty note
    if (!noteText.trim()) {
      alert("Note cannot be empty!");
      return;
    }
    try {
      await createNote(noteText); // API call to create note
      setNoteText(""); // Clear textarea
      setCurrentPage(1); // Reset to first page to see the new note
      // Reload notes
      const data = await fetchNotes(1);
      setNotes(data.notes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  // Handler: Update note
  const handleUpdateNote = async (noteId, currentContent) => {
    // Prompt user for new content
    const newContent = prompt("Update your note:", currentContent);
    // User cancelled or entered empty content
    if (newContent === null || !newContent.trim()) {
      return;
    }

    try {
      await updateNote(noteId, newContent); // API call to update note
      // Reload current page to show updated notes
      const data = await fetchNotes(currentPage);
      setNotes(data.notes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note. Please try again.");
    }
  };

  // Handler: Delete note
  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(noteId);
      //Reload Current page
      const data = await fetchNotes(currentPage);
      setNotes(data.notes);
      setTotalPages(data.totalPages);

      // If current page is now empty and it's not page 1, go to previous page
      if (data.notes.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-logo">
          <FiEdit3 size={32} color="#4F7CFF" />
        </div>
        <h1 className="header-title">Notetaker App</h1>
      </header>

      <main>
        <div className="note-form">
          <textarea
            className="textarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type Something....."
            rows="6"
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleAddNote}>
              <FiPlus size={18} />
              Add note
            </button>
          </div>
        </div>

        {/* Notes List */}
        <ul className="note-list">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              noteId={note.id}
              note={note.content}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </ul>

        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default HomePage;
