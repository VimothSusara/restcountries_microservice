# restcountries_microservice

RestCountries Microservice is a full-stack API key management service. It provides a frontend built with React (via Vite) and a backend using Node.js, Express, and SQLite. The backend includes support for running inside Docker using Docker Compose.

---

## 🌐 Features

- User Registration and management
- API key registration and management
- React frontend (Vite)
- Node.js + Express backend
- SQLite database
- COntainerized server side with Docker Compose

---

## ⚙️ Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Containerization**: Docker, Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/restcountries_microservice.git
cd restcountries_microservice
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend (Without Docker)

```bash
cd server
npm install
npm run dev
```

### Backend (With Docker)

#### Build and start containers

```bash
docker-compose up --build
```

#### Stop Containers

```bash
docker-compose down
```


