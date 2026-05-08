# MERN Hacker News Scraper
A mini full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and provides a React frontend with JWT authentication and bookmark functionality. 
The stack combines MongoDB for storage, Express and Node.js for the API layer, and React for the client UI.
## Features
### Backend
- Scrapes stories from [Hacker News](https://news.ycombinator.com) and stores them in MongoDB. [web:131]
- Scraper runs automatically on server start.
- Scraper can also be triggered manually via API.
- JWT-based authentication for register and login.
- Fetch all stories sorted by points in descending order.
- Toggle bookmarks for authenticated users.
- Fetch logged-in user bookmarks.
- Pagination support for stories.

### Frontend
- Displays stories with title, points, author, and posted time.
- Register and Login pages.
- Bookmark toggle for each story.
- Protected Bookmarks page.
- Authentication state managed using React Context API, which is a standard approach for shared app-level auth state in React.

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Scraping
- Hacker News ([news.ycombinator.com](https://news.ycombinator.com)), a Y Combinator news site focused on technology and entrepreneurship.

## Project Structure

```bash
Web-Scraper/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scraper/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── styles/
│   ├── .env
│   ├── package.json
│
└── README.md

## API Endpoints
### Auth Routes
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user and return JWT

### Scraper Route
- `POST /api/scrape` — Trigger scraping manually

### Story Routes
- `GET /api/stories` — Get all stories, sorted by points descending
- `GET /api/stories/:id` — Get a single story
- `POST /api/stories/:id/bookmark` — Toggle bookmark for authenticated user
- `GET /api/stories/bookmarks/me` — Get logged-in user bookmarks

### Pagination
- `GET /api/stories?page=1&limit=10` — Get paginated stories using query parameters, which is a common REST API pattern for server-side pagination. 

## Environment Variables

Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```
Create a `.env` file inside the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Environment variables should be used for secrets and configuration instead of hardcoding values.

## Installation and Setup
### 1. Clone the repository
```bash
git clone https://github.com/your-username/Web-Scraper.git
cd Web-Scraper
```
### 2. Install backend dependencies
```bash
cd backend
npm install
### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```
### 4. Configure environment variables
Add the `.env` files in both backend and frontend as shown above.

### 5. Run the backend

```bash
cd backend
npm run dev
```
### 6. Run the frontend

```bash
cd frontend
npm run dev
```
### 7. Open the app
Visit:

```bash
http://localhost:5173
```
## How It Works

1. When the backend server starts, the scraper fetches stories from Hacker News and stores them in MongoDB. 
2. Users can register and log in using JWT-based authentication, a common pattern for protected routes and API access in React applications. 
3. The frontend fetches stories from the backend API and displays them in a clean UI.
4. Logged-in users can bookmark stories, and bookmarks are saved in MongoDB through the backend API.
5. The Bookmarks page is protected, so only authenticated users can access it. Protected routes are a standard React Router pattern for JWT-based apps. 

## Frontend Functionality

- Story list page with:
  - Title
  - Points
  - Author
  - Posted time
- Login page
- Register page
- Bookmark toggle button
- Protected bookmarks page
- React Context API for auth state management, which helps share login state across components without prop drilling. 

## Backend Functionality

- User registration and login
- Password hashing
- JWT token generation
- Authentication middleware
- Story scraping and storage
- Bookmark toggle API
- Story listing with sorting
- Story detail API
- Pagination support 

## Sample Request Examples

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Abhinash",
  "email": "abhinash@example.com",
  "password": "123456"
}
```
### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "abhinash@example.com",
  "password": "123456"
}
```
### Get Stories
```http
GET /api/stories?page=1&limit=10
```
### Toggle Bookmark
```http
POST /api/stories/:id/bookmark
Authorization: Bearer <token>
```
## GitHub Submission Notes
This repository includes:
- Full source code for frontend and backend
- Multiple meaningful commits
- README with setup instructions
- Environment variable documentation

## Future Improvements
- Better error states and loaders
- Bookmark filters
- Better scrape deduplication
- Unit and integration tests

## Author
**Abhinash**
Full-Stack MERN Developer
