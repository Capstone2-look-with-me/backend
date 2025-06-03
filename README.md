
# 📦 Look With Me - Backend (NestJS)

> Backend service for Look With Me - a platform with authentication, cloud media upload, Redis caching, and email features.

---

## 🚀 Tech Stack

- **NestJS** (Node.js framework)
- **MongoDB** (via Mongoose)
- **Redis** (via Redis Cloud)
- **JWT** for Authentication
- **Cloudinary** for Image Upload
- **Nodemailer (Gmail SMTP)** for Email Services

---

## 📁 Project Setup

### 1. Clone the repo

```bash
git clone https://github.com/Capstone2-look-with-me/backend.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Tạo file `.env` trong thư mục gốc với nội dung như sau:

```env
PORT=8001
MONGODB_URL='your_mongodb_url'

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_ACCESS_EXPIRE=1000m

JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=1d

# Sample Data Initialization
SHOULD_INIT=true
INIT_PASSWORD=123456

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_AUTH_USER=your_email@gmail.com
EMAIL_AUTH_PASS=your_app_password
EMAIL_PREVIEW=true

# App Host
HOST=http://localhost:8001

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis Config
REDIS_URL=your_redis_url
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
```


---

### 4. Run the app

```bash
npm run start:dev
```

---

## 🛠 Available Scripts

| Command | Description |
|--------|-------------|
| `npm run start:dev` | Run in development mode (with hot reload) |
| `npm run build` | Build the project |
| `npm run start:prod` | Run built app in production mode |
| `npm run test` | Run unit tests |

---

## 📬 Contact

Created by [@vovanminhv23](mailto:vovanminhv23@gmail.com)
