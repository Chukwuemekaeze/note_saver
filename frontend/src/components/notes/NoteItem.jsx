import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function NoteItem({ noteId, note, onUpdate, onDelete }) {
  return (
    <li className="note-item">
      <Link to={`/notes/${noteId}`} className="note-content">
        {note}
      </Link>

      <div className="note-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onUpdate(noteId, note)}
        >
          <FiEdit2 size={16} />
          Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(noteId)}>
          <FiTrash2 size={16} />
          Delete
        </button>
      </div>
    </li>
  );
}

export default NoteItem;
