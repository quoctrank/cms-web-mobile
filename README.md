# Expense Manager (Strapi v5 + Gatsby + React Native)

> ⚙️ **Yêu cầu**: Node LTS **20 hoặc 22**.
> 🗃️ **SQLite** trên Strapi 5 dùng **better-sqlite3** và `client: 'sqlite'` trong `config/database.js`.

## Khởi chạy

### 1) Backend (Strapi v5)

```bash
cd backend
# Cài deps
npm install
# Dev
npm run develop
```

- Lần đầu chạy: tạo admin và user tại http://localhost:1337/admin
- Bật quyền tại **Settings → Roles → Authenticated**: `find/findOne/create/update/delete` cho `transactions`, `wallets`, `categories`.

### 2) Web (Gatsby)

```bash
cd web
npm install
npm run develop
# http://localhost:8000
```

### 3) Mobile (React Native)

```bash
cd mobile
npm install
npm run start
```

---
