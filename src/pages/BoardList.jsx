import React, { useEffect, useState } from 'react';
import { getBoards } from '../api/boardApi';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await getBoards();
            if (Array.isArray(response.data)) {
                setBoards(response.data);
            } else {
                setBoards([]);
                console.error('Received data is not an array:', response.data);
            }
        } catch (err) {
            setError('백엔드 서버 연결에 실패했습니다. (포트 5000번 개방을 확인해주세요)');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="glass-card" style={{ marginTop: '50px' }}>
            <div className="loader"></div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>데이터를 불러오는 중입니다...</p>
        </div>
    );

    if (error) return (
        <div className="glass-card" style={{ marginTop: '50px', borderColor: '#ef4444' }}>
            <h2 style={{ color: '#ef4444' }}>연결 오류</h2>
            <p style={{ marginTop: '10px' }}>{error}</p>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => window.location.reload()}>다시 시도</button>
        </div>
    );

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Community Board</h1>
                <Link to="/write" className="btn btn-primary">
                    <span>+</span> 새 글 작성
                </Link>
            </header>

            <div className="glass-card">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
                            <th>TITLE</th>
                            <th style={{ width: '150px' }}>AUTHOR</th>
                            <th style={{ width: '150px' }}>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(boards) && boards.map((board) => (
                            <tr key={board.id}>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{board.id}</td>
                                <td>
                                    <Link to={`/detail/${board.id}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600' }}>
                                        {board.title}
                                    </Link>
                                </td>
                                <td>
                                    <span style={{ color: 'var(--accent)' }}>@{board.author}</span>
                                </td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {new Date(board.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {(!boards || boards.length === 0) && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                    아직 작성된 글이 없습니다. 첫 번째 주인공이 되어보세요!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BoardList;
