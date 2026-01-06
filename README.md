# 📝 Note Saver App

A full-stack web application for creating, viewing, editing, and deleting notes with a clean, modern interface.

## 🚀 Features

- ✨ **Create Notes**: Quickly add new notes with a simple text input
- 📖 **View Notes**: Browse all your notes with pagination support
- ✏️ **Edit Notes**: Update existing notes with inline editing
- 🗑️ **Delete Notes**: Remove unwanted notes with confirmation
- 📄 **Pagination**: Navigate through notes 5 at a time
- 🔒 **Rate Limiting**: API protection against spam and abuse
- 🌐 **CORS Enabled**: Secure cross-origin resource sharing
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **React** (v18+) - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend

- **Flask** - Python web framework
- **Flask-SQLAlchemy** - ORM for database management
- **Flask-CORS** - Handle cross-origin requests
- **Flask-Limiter** - Rate limiting for API endpoints
- **SQLite** - Lightweight database
- **python-dotenv** - Environment variable management

## 📦 Project Structure

```
note_saver/
├── backend/
│   ├── app.py                 # Flask application & API routes
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (not in repo)
│   ├── .env.example          # Environment variables template
│   └── notes.db              # SQLite database (auto-generated)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── notes/
│   │   │       ├── NoteDetail.jsx    # Individual note view/edit page
│   │   │       ├── NoteItem.jsx      # Single note card component
│   │   │       └── Pagination.jsx    # Pagination controls
│   │   ├── pages/
│   │   │   └── HomePage.jsx          # Main page with note list
│   │   ├── services/
│   │   │   └── api.js                # API service functions
│   │   ├── App.jsx                   # Root component with routing
│   │   └── main.jsx                  # Application entry point
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML template
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   └── tailwind.config.js           # Tailwind CSS configuration
└── README.md                         # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure your settings:

   ```plaintext
   # Flask Configuration
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-change-this-in-production

   # Database Configuration
   DATABASE_NAME=notes.db

   # CORS Origins (comma-separated)
   ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

   # Rate Limiting
   RATELIMIT_STORAGE_URI=memory://
   RATE_LIMIT_PER_MINUTE=60
   RATE_LIMIT_PER_HOUR=1000
   ```

5. **Run the Flask server:**

   ```bash
   python app.py
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint         | Description               | Rate Limit |
| ------ | ---------------- | ------------------------- | ---------- |
| GET    | `/api`           | Welcome message           | 60/min     |
| GET    | `/api/notes`     | Get all notes (paginated) | 60/min     |
| GET    | `/api/notes/:id` | Get a single note by ID   | 60/min     |
| POST   | `/api/notes`     | Create a new note         | 10/min     |
| PUT    | `/api/notes/:id` | Update an existing note   | 20/min     |
| DELETE | `/api/notes/:id` | Delete a note             | 10/min     |

### Request/Response Examples

#### Create a Note

**Request:**

```bash
POST /api/notes
Content-Type: application/json

{
  "content": "This is my first note!"
}
```

**Response:**

```json
{
  "message": "Note created",
  "note": {
    "id": 1,
    "content": "This is my first note!",
    "timestamp": "2026-01-06T11:30:00.000000"
  }
}
```

#### Get All Notes (Paginated)

**Request:**

```bash
GET /api/notes?page=1
```

**Response:**

```json
{
  "notes": [
    {
      "id": 1,
      "content": "This is my first note!",
      "timestamp": "2026-01-06T11:30:00.000000"
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalNotes": 1
}
```

#### Update a Note

**Request:**

```bash
PUT /api/notes/1
Content-Type: application/json

{
  "content": "Updated note content"
}
```

**Response:**

```json
{
  "message": "Note updated",
  "note": {
    "id": 1,
    "content": "Updated note content",
    "timestamp": "2026-01-06T11:35:00.000000"
  }
}
```

#### Delete a Note

**Request:**

```bash
DELETE /api/notes/1
```

**Response:**

```json
{
  "message": "Note with id 1 deleted"
}
```

## 🔒 Security Features

### Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 60 requests/minute, 1000 requests/hour
- **POST /api/notes**: 10 requests/minute
- **PUT /api/notes/:id**: 20 requests/minute
- **DELETE /api/notes/:id**: 10 requests/minute

When rate limit is exceeded, the API returns:

```json
{
  "error": "429 Too Many Requests"
}
```

### CORS Configuration

Cross-Origin Resource Sharing is configured to only allow requests from specified origins (defined in `.env`).

### Environment Variables

Sensitive configuration is stored in `.env` file and never committed to version control.

## 🎨 Frontend Features

### Components

#### HomePage

- Main dashboard displaying all notes
- Create new notes with text input
- Inline editing and deletion
- Pagination controls

#### NoteDetail

- Dedicated page for viewing/editing a single note
- Full-screen editing experience
- Back navigation to home page

#### NoteItem

- Individual note card component
- Display note content and timestamp
- Edit and delete buttons
- Hover effects and animations

#### Pagination

- Navigate between pages
- Previous/Next buttons
- Current page indicator
- Disabled state for boundary pages

## 🧪 Testing

### Test Rate Limiting

Open browser console on `http://localhost:5173` and run:

```javascript
// Send 15 rapid requests (limit is 10/minute for POST)
for (let i = 1; i <= 15; i++) {
  fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `Test note ${i}` }),
  })
    .then((r) => {
      console.log(`Request ${i}: Status ${r.status}`);
      return r.json();
    })
    .then((d) => console.log(`Response ${i}:`, d))
    .catch((e) => console.error(`Request ${i} failed:`, e));
}
```

Expected result: First 10 succeed (201), last 5 fail (429).

## 📝 Available Scripts

### Backend

```bash
python app.py          # Start Flask development server
pip freeze > requirements.txt  # Update dependencies
```

### Frontend

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

## 🐛 Troubleshooting

### Backend Issues

**Database not created:**

```bash
# Delete existing database and restart
rm notes.db
python app.py
```

**Port 5000 already in use:**

```python
# Edit app.py, change the port in the last line:
app.run(debug=True, port=5001)
```

**Rate limiting not working:**

```bash
# Ensure Flask-Limiter is installed
pip install Flask-Limiter
```

### Frontend Issues

**CORS errors:**

- Check `ALLOWED_ORIGINS` in backend `.env` includes your frontend URL
- Ensure backend is running on `http://localhost:5000`

**API not connecting:**

- Verify backend is running
- Check `API_URL` in `frontend/src/services/api.js` matches backend URL

## 🚀 Deployment

### Backend (Flask)

**For production:**

1. Set `FLASK_ENV=production` in `.env`
2. Generate a strong `SECRET_KEY`
3. Use a production WSGI server (Gunicorn, uWSGI)
4. Consider using PostgreSQL instead of SQLite
5. Use Redis for rate limiting storage instead of memory

**Example with Gunicorn:**

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (React)

**Build for production:**

```bash
cd frontend
npm run build
```

The `dist/` folder contains optimized production files.

**Deploy to:**

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

This is a personal learning project, but suggestions are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Chukwuemeka

## 🔮 Future Enhancements

Ideas for future improvements:

- 🔐 User authentication and authorization
- 🏷️ Tags and categories for notes
- 🔍 Search functionality
- 📎 File attachments
- 🌙 Dark mode toggle
- 📊 Note statistics and analytics
- 🗂️ Export notes (PDF, JSON, TXT)
- 🔔 Reminder notifications
- ✅ Todo list within notes
- 🎨 Rich text editor (Markdown support)
- 📱 Progressive Web App (PWA)
- 🔄 Real-time sync across devices

## 📚 Learning Resources

This project helped me learn:

- Full-stack development workflow
- RESTful API design
- React hooks and state management
- Flask web framework
- Database operations with SQLAlchemy
- API rate limiting and security
- Environment variable management
- Modern JavaScript (ES6+)
- Tailwind CSS utility classes

---

**Happy Note Taking! 📝✨**
