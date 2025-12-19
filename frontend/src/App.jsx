import notetakerLogo from '/notetaker_logo.svg'
import { useState, useEffect} from 'react'
import './App.css'
import { fetchNotes, createNote, updateNote, deleteNote } 
from './services/api.js'


function NotesAndActionButtons({noteId, note, onUpdate, onDelete}) {
  return (
      <li className='flex w-full gap-2 mb-2'>
        <span className='flex-1 border border-black p-2'>{note}</span>
        <button 
          className={`rounded-lg bg-blue-500 text-white px-3 py-2`}
          onClick={() => onUpdate(noteId, note)}
        >
          Update
        </button>
        <button 
          className={`rounded-lg bg-red-500 text-white px-3 py-2`}
          onClick={() => onDelete(noteId)}
        >
          Delete
        </button>
      </li>
  )
}

function Pagination({currentPage, totalPages, onPageChange}) {

  return (
    <div className='flex gap-2 items-center mt-6'>
      <button 
        className='px-4 py-2 border border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === index + 1 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'border-black hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      
      <button 
        className='px-4 py-2 border border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

function App() {
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  


// Effect 1: Load notes
  useEffect( () => {
    const loadNotes =  async (page) => {
        try {
          const data = await fetchNotes(page);
          setNotes(data.notes);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error('Error loading notes:', error);
        }
      };

    loadNotes(currentPage);
  }, [currentPage]);


// Handler: Add note
  const handleAddNote = async () => {
      // Prevent adding empty note
      if (!noteText.trim()){
        alert("Note cannot be empty!");
        return;
      }
      try{
        await createNote(noteText); // API call to create note
        setNoteText(''); // Clear textarea
        setCurrentPage(1); // Reset to first page to see the new note
        // Reload notes
        const data = await fetchNotes(1);
        setNotes(data.notes);
        setTotalPages(data.totalPages);

      }catch(error){
        console.error('Error adding note:', error);
        alert("Failed to add note. Please try again.");
      }
    };

// Handler: Update note
  const handleUpdateNote = async (noteId, currentContent) =>{
      // Prompt user for new content
      const newContent = prompt("Update your note:", currentContent);
      // User cancelled or entered empty content
      if (newContent === null || !newContent.trim()){
        return; 
      }

      try{
        await updateNote(noteId, newContent); // API call to update note
        // Reload current page to show updated notes
        const data = await fetchNotes(currentPage);
        setNotes(data.notes);
        setTotalPages(data.totalPages);
      } catch (error){
        console.error('Error updating note:', error);
        alert("Failed to update note. Please try again.");
      }
    };

// Handler: Delete note
  const handleDeleteNote = async (noteId) => {
      const confirmed = window.confirm("Are you sure you want to delete this note?")
      
      if (!confirmed) {
        return
      };

      try{
        await deleteNote(noteId);
        //Reload Current page 
        const data = await fetchNotes(currentPage);
        setNotes(data.notes);
        setTotalPages(data.totalPages);

        // If current page is now empty and it's not page 1, go to previous page
        if (data.notes.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }

    } catch (error){
        console.error('Error deleting note:', error);
        alert("Failed to delete note. Please try again.");
      }
    };


  return (
    <>
      <header className='flex items-center  justify-center p-4 gap-7'>
        <img src={notetakerLogo} alt="Notetaker logo" className='h-20'/>
        <h1 className='font-bold text-4xl'>Notetaker App</h1>
      </header>

      <main className='flex flex-col items-center p-6'>
        <div className='w-2/4 flex flex-col'>
          <textarea 
            className="border h-64 p-4"
            value = {noteText}
            onChange = {(e)=> setNoteText(e.target.value)}
            placeholder='Type Something.....'
          ></textarea>
          <button
          className='m-4 mr-0 border p-4 border-black self-end'
          onClick={handleAddNote}>
          Add note</button>
        </div>


        <div className='flex flex-col items-center w-2/4'>
          <ul className='w-full'> 
            {notes.map((note) => (
            <NotesAndActionButtons
            key={note.id} 
            noteId={note.id} 
            note={note.content} 
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
            />
            ))}
          </ul>
        </div>

        <div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
        </div>

      </main>
      
      <footer>

      </footer>
    </>
  )
}

export default App
