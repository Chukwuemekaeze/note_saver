from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173",
                    "http://127.0.0.1:5173", # react dev server
                    "https://emekasexampledomain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization",
                        "application/json"]
    }
})

#In-memory storage for notes
notes = []
note_id_counter = 1

@app.route("/api")
def welcome():
    return "<h1>Welcome to the Note Taker App!</h1>"

@app.route("/api/notes", methods=["POST"])
def create_note():
    global note_id_counter
    data = request.json
    note_content = data.get("content", "")

    if not note_content:
        return {"error": "Note content cannot be empty"}, 400
    
    note = {
        "id": note_id_counter,
        "content": note_content,
        "timestamp": datetime.now().isoformat()
    }
    notes.append(note)
    note_id_counter += 1

    return {"message": "Note created", "note": note}, 201

@app.route("/api/notes", methods=["GET"])
def get_notes():
    page = request.args.get("page", 1, type=int)  # Get page from query params, default to 1
    notes_per_page = 5
    
    # Calculate pagination
    total_notes = len(notes)
    total_pages = (total_notes + notes_per_page - 1) // notes_per_page  # Ceiling division
    start_index = (page - 1) * notes_per_page
    end_index = start_index + notes_per_page
    
    # Get notes for current page (newest first)
    paginated_notes = notes[::-1][start_index:end_index]
    
    return {
        "notes": paginated_notes,
        "currentPage": page,
        "totalPages": total_pages,
        "totalNotes": total_notes
    }, 200

@app.route("/api/notes/<int:note_id>", methods=["GET"])
def get_note(note_id):
    """Get a single note by its ID."""
    note = next((n for n in notes if n["id"] == note_id), None)

    #If note not found return 404
    if note is None:
        return {"error": "Note not found"}, 404
    
    # If found, return the note
    return note, 200

@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    global notes
    notes = [note for note in notes if note["id"] != note_id]
    return {"message": f"Note with id {note_id} deleted"}, 200

@app.route("/api/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.json
    new_content = data.get("content", "")

    if not new_content:
        return {"error": "Note content cannot be empty"}, 400

    for note in notes:
        if note["id"] == note_id:
            note["content"] = new_content
            note["timestamp"] = datetime.now().isoformat()
            return {"message": "Note updated", "note": note}, 200

    return {"error": "Note not found"}, 404

if __name__ == "__main__":
    app.run(debug=True)