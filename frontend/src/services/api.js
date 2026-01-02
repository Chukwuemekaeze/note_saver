const API_URL ='http://localhost:5000/api';

export const fetchNotes = async (page = 1) => {
    const response = await fetch(`${API_URL}/notes?page=${page}`);
    return response.json();
};

export const createNote = async (noteText) => {
    const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: noteText})
    });
    return response.json();
}

export const fetchNoteById = async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}`);

    if (!response.ok) {
        // Handle different error codes
        if (response.status === 404) {
            throw new Error('Note not found');
        } else if (response.status === 500) {
            throw new Error('Server error, please try again later');
        } else {
            throw new Error('Failed to fetch note');
        }
    }

    return response.json();
}


export const updateNote = async (id, noteText) => {
    const response = await fetch(`${API_URL}/notes/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: noteText})
    });
    return response.json();
}

export const deleteNote = async (id, noteText) => {
    const response = await fetch(`${API_URL}/notes/${id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content:noteText})
    });
    return response.json();
}