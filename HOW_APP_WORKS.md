# Aloka - How The Application Works

## Overview

Aloka is a **crowdfunding/donation platform** built with a modern full-stack architecture. Users can create fundraising campaigns and donate to causes they care about.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER (Browser)                             │
│                         http://localhost:80                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                          │
│                    Container: aloka-frontend                         │
│                    Port: 80 → Nginx serves static files              │
│                                                                      │
│  Components:                                                         │
│  ├── Landing Page (Header, Hero, HowItWorks, FeaturedCauses...)     │
│  ├── Auth Pages (SignIn, SignUp)                                    │
│  └── Dashboard (Dashboard, MyCampaigns, MyDonations)                │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                          HTTP API Requests
                          (fetch/axios calls)
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express)                      │
│                     Container: aloka-backend                         │
│                     Port: 5001                                       │
│                                                                      │
│  API Endpoints: /api/user, /api/campaigns, /api/donations           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                            SQL Queries
                            (pg driver)
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL 15)                          │
│                    Container: postgres-db                            │
│                    Internal Port: 5432                               │
│                    Host Port: 5434 (for pgAdmin access)              │
│                                                                      │
│  Tables: users, campaigns, donations                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | UI Components & State Management |
| **Styling** | Tailwind CSS + shadcn/ui | Modern, responsive design |
| **Build Tool** | Vite | Fast development & bundling |
| **Backend** | Node.js + Express 5 | REST API Server |
| **Database** | PostgreSQL 15 | Relational data storage |
| **ORM/Driver** | pg (node-postgres) | Database queries |
| **Validation** | Joi | Input validation |
| **Auth** | bcryptjs | Password hashing |
| **Containerization** | Docker + Docker Compose | Multi-container orchestration |
| **CI/CD** | Jenkins | Automated builds & deployments |

---

## Backend Deep Dive

### Directory Structure

```
backend/
├── src/
│   ├── index.js              # Entry point - starts Express server
│   ├── config/
│   │   └── db.js             # PostgreSQL connection pool
│   ├── routes/               # API route definitions
│   │   ├── userRoutes.js
│   │   ├── campaignRoutes.js
│   │   └── donationRoutes.js
│   ├── controllers/          # Request handlers (business logic)
│   │   ├── userController.js
│   │   ├── campaignController.js
│   │   └── donationController.js
│   ├── models/               # Database queries (data access layer)
│   │   ├── userModel.js
│   │   ├── campaignModel.js
│   │   └── donationModel.js
│   ├── middlewares/          # Express middleware
│   │   ├── inputValidator.js # Joi schema validation
│   │   └── errorHandler.js   # Centralized error handling
│   └── data/                 # Database setup & seeding
│       ├── createUserTable.js
│       ├── createCampaignsTable.js
│       ├── createDonationsTable.js
│       └── seedData.js
├── .env                      # Environment variables
├── Dockerfile                # Container configuration
└── package.json              # Dependencies & scripts
```

### How Backend Starts (index.js)

```javascript
// Startup sequence:
1. Load environment variables (dotenv)
2. Initialize Express app
3. Apply middleware (JSON parser, CORS)
4. Register routes (/api/user, /api/campaigns, /api/donations)
5. Connect to PostgreSQL database
6. Create tables if they don't exist (migrations)
7. Seed initial data (campaigns, donations)
8. Start HTTP server on port 5001
```

### Request Flow (Example: Create User)

```
Client Request: POST /api/user/signup
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  1. EXPRESS ROUTER (userRoutes.js)                   │
│     router.post("/user/signup", validateUser, ...)   │
│     - Matches route pattern                           │
│     - Calls middleware chain                          │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  2. MIDDLEWARE (inputValidator.js)                   │
│     - Validates request body with Joi schema         │
│     - Checks: firstName, lastName, email, password   │
│     - Returns 400 if invalid, else calls next()      │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  3. CONTROLLER (userController.js)                   │
│     createUser()                                     │
│     - Extract data from req.body                     │
│     - Hash password with bcrypt (10 salt rounds)     │
│     - Call model service                             │
│     - Send JSON response                             │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  4. MODEL (userModel.js)                             │
│     createUserService()                              │
│     - Execute SQL: INSERT INTO users ...             │
│     - Uses parameterized queries ($1, $2...)         │
│     - Returns created user row                       │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  5. DATABASE (PostgreSQL)                            │
│     - Stores user in 'users' table                   │
│     - Auto-generates id (SERIAL)                     │
│     - Sets created_at timestamp                      │
└──────────────────────────────────────────────────────┘
       │
       ▼
Response: 201 Created { status, message, data: user }
```

---

## API Endpoints

### User Endpoints (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/signup` | Register new user |
| POST | `/api/user/signin` | Login (email + password) |
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get user by ID |
| PUT | `/api/user/:id` | Update user |
| DELETE | `/api/user/:id` | Delete user |

### Campaign Endpoints (`/api/campaigns`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/campaigns` | Get all active campaigns |
| GET | `/api/campaigns/:id` | Get campaign by ID |
| GET | `/api/campaigns/user/:userId` | Get user's campaigns |
| PUT | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |

### Donation Endpoints (`/api/donations`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/donations` | Create donation |
| GET | `/api/donations` | Get all donations |
| GET | `/api/donations/recent` | Get recent donations |
| GET | `/api/donations/:id` | Get donation by ID |
| GET | `/api/donations/user/:userId` | Get user's donations |
| GET | `/api/donations/user/:userId/stats` | Get user donation stats |
| GET | `/api/donations/campaign/:campaignId` | Get campaign donations |

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    account_type VARCHAR(20),        -- 'donor', 'campaigner', 'both'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Campaigns Table
```sql
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    goal DECIMAL(12,2) NOT NULL,
    raised DECIMAL(12,2) DEFAULT 0,
    donors INTEGER DEFAULT 0,
    category VARCHAR(100),
    location VARCHAR(255),
    days_left INTEGER DEFAULT 30,
    is_urgent BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    organizer VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Donations Table
```sql
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    campaign_id INTEGER REFERENCES campaigns(id),
    amount DECIMAL(12,2) NOT NULL,
    donor_name VARCHAR(255),
    is_anonymous BOOLEAN DEFAULT FALSE,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Docker Configuration

### Container Network

All containers run on the same Docker network (`aloka_default`), allowing them to communicate using service names:

- **Backend → Database**: Uses hostname `db` (not `localhost`)
- **Frontend → Backend**: Makes API calls to `http://backend:5001` or proxied

### Environment Variables (.env)

```bash
PORT=5001           # Backend server port
DB_USER=postgres    # PostgreSQL username
DB_HOST=db          # Container name (not localhost!)
DB_DATABASE=aloka-db
DB_DBPORT=5432      # Internal container port (not host port)
DB_PASSWORD=1234
```

### Why DB_HOST=db and not localhost?

Inside Docker:
- `localhost` = the container itself
- `db` = the database container (Docker DNS resolution)

---

## Key Concepts Explained

### 1. Connection Pool (db.js)
```javascript
const pool = new Pool({...});
```
- Reuses database connections instead of creating new ones
- Improves performance under load
- Handles connection lifecycle automatically

### 2. Password Hashing (bcrypt)
```javascript
const salt = await bcrypt.genSalt(10);  // Random salt
const hashed = await bcrypt.hash(password, salt);
```
- Never stores plain-text passwords
- Salt prevents rainbow table attacks
- Cost factor (10) controls computation time

### 3. Parameterized Queries
```javascript
pool.query("SELECT * FROM users WHERE id = $1", [id]);
```
- Prevents SQL injection attacks
- Database escapes values automatically
- Never concatenate user input into SQL strings

### 4. Express Middleware Chain
```javascript
router.post("/signup", validateUser, createUser);
// validateUser runs first, then createUser
```
- Middleware can modify req/res
- Call `next()` to continue chain
- Call `next(error)` to jump to error handler

### 5. Error Handling Pattern
```javascript
try {
    // business logic
} catch (err) {
    next(err);  // Passes to errorHandler middleware
}
```
- Centralized error handling
- Consistent error response format
- Logs stack traces for debugging

---

## Running the Application

### Start all services:
```bash
docker-compose up -d
```

### Access points:
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:5001
- **Database (pgAdmin)**: localhost:5434
- **Jenkins**: http://localhost:8080

### View logs:
```bash
docker logs aloka-backend --tail 50
docker logs aloka-frontend --tail 50
```

### Stop services:
```bash
docker-compose down
```
