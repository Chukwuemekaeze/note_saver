import { Link } from "react-router-dom";

function NoteItem({noteId, note, onUpdate, onDelete}) {
    return(
        <li className='flex w-full gap-2 mb-2'>
            <Link 
                to={`/notes/${noteId}`} 
                className='flex-1 border border-black p-2 hover:bg-gray-100 cursor-pointer'
            >
                {note}
            </Link>
            <button 
                className={'rounded-lg bg-blue-500 text-white px-3 py-2'}
                onClick={() => onUpdate(noteId, note)}
            >
                Update
            </button>
            <button 
            className={'rounded-lg bg-red-500 text-white px-3 py-2 hover:bg-red-600'}
            onClick={() => onDelete(noteId)}
            >
                Delete
            </button>
        </li>
    )
}

export default NoteItem;