const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const boardRoutes = require('./routes/boardRoutes');

app.use(cors());
app.use(express.json());

// API 라우트 설정
app.use('/api/boards', boardRoutes);

// --- 프론트엔드 정적 파일 서빙 설정 (배포용) ---
// 프론트엔드 빌드 폴더(dist) 위치 지정 (backend 폴더와 같은 레벨에 있다고 가정)
const distPath = path.join(__dirname, '../dist');

// 정적 파일 제공
app.use(express.static(distPath));

// 모든 경로에 대해 index.html 반환 (React Router 지원)
app.use((req, res) => {
    // API 요청이 아닌 경우에만 index.html 전송
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});
// ------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} (Serving Frontend & API)`);
});
