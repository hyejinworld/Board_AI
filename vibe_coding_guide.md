# 🧠 Antigravity Vibe Coding Guide (React + Vite + Node + MySQL)

## 🎯 목표

간단한 게시판 CRUD 시스템을 빠르게 구현하고, 반복 개선하는 것을 목표로 한다.

- Frontend: React (Vite)
- Backend: Node.js (Express)
- DB: MySQL (EC2)
- 통신: REST API (JSON)
- HTTP Client: Axios (with `axios.create` instance)
- Env Management: `.env` (using `VITE_` prefix for Vite)

## 🧩 개발 원칙 (Vibe Coding 스타일)

1. 작게 만들고 빠르게 확인
2. 동작 우선
3. 명확한 구조 유지
4. 에러는 반드시 처리

## 🏗️ 프로젝트 구조

### Frontend
```text
src/
├─ api/
├─ pages/
├─ components/
└─ App.jsx
```

### Backend
```text
backend/
├─ routes/
├─ controllers/
├─ services/
├─ db/
└─ app.js
```

## 🔌 API

- `GET /boards` : 전체 목록 조회
- `GET /boards/:id` : 개별 상세 조회
- `POST /boards` : 새 글 작성
- `PUT /boards/:id` : 글 수정
- `DELETE /boards/:id` : 글 삭제

## 🗄️ MySQL

```sql
CREATE TABLE board (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
