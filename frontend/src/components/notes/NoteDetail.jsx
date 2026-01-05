import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteById } from '../../services/api';

function NoteDetail(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                const data = await fetchNoteById(id);
                setNote(data);
                setError(null);

            } catch (err) {
                setError('Failed to load note. It may not exist.');
                console.error('Error loading note:', err);
            } finally {
                setLoading(false);
            };
        };
        loadNotes();
    }, [id])

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-xl'>Loading note...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
                <p className='text-xl text-red-600'>{error}</p>
                <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >    
                    Back to Notes</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-4 px-4 py-2 border border-black rounded-lg hover:bg-gray-100"
                >
                    ← Back to All Notes
                </button>

                <div className="border border-black rounded-lg p-6">
                    <div className="mb-4 text-sm text-gray-600">
                        <p>Note ID: {note.id}</p>
                        <p>Created: {new Date(note.timestamp).toLocaleString()}</p>
                    </div>
                    
                    <div className="border-t border-gray-300 pt-4">
                        <h2 className="text-xl font-bold mb-4">Note Content:</h2>
                        <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
                            {note.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NoteDetail;

    