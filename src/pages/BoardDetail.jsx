import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoard, deleteBoard } from '../api/boardApi';

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBoard();
    }, [id]);

    const fetchBoard = async () => {
        try {
            const response = await getBoard(id);
            setBoard(response.data);
        } catch (err) {
            alert('게시글을 불러올 수 없습니다.');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await deleteBoard(id);
                alert('삭제되었습니다.');
                navigate('/');
            } catch (err) {
                alert('삭제에 실패했습니다.');
            }
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (!board) return <div>게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1 style={{ fontSize: '2.2rem', textAlign: 'left' }}>{board.title}</h1>
            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '15px' }}>
                <span>By <strong style={{ color: 'var(--accent)' }}>{board.author}</strong></span>
                <span>•</span>
                <span>{new Date(board.created_at).toLocaleString()}</span>
            </div>
            
            <div style={{ minHeight: '300px', whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {board.content}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
                <button onClick={() => navigate('/')} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>목록으로</button>
                <div style={{ flex: 1 }}></div>
                <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">수정하기</button>
                <button onClick={handleDelete} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>삭제</button>
            </div>
        </div>
    );
};

export default BoardDetail;
