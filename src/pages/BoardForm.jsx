import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBoard, getBoard, updateBoard } from '../api/boardApi';

const BoardForm = () => {
    const { id } = useParams(); // id가 있으면 수정 모드
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ''
    });

    useEffect(() => {
        if (id) {
            fetchBoard();
        }
    }, [id]);

    const fetchBoard = async () => {
        try {
            const response = await getBoard(id);
            const { title, content, author } = response.data;
            setFormData({ title, content, author });
        } catch (err) {
            alert('게시글 정보를 가져오지 못했습니다.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateBoard(id, formData);
                alert('수정되었습니다.');
            } else {
                await createBoard(formData);
                alert('등록되었습니다.');
            }
            navigate('/');
        } catch (err) {
            alert('저장에 실패했습니다.');
        }
    };

    return (
        <div className="glass-card" style={{ maxWidth: '700px', margin: '40px auto' }}>
            <h1>{id ? 'Edit Article' : 'New Article'}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>생각을 자유롭게 공유해 보세요.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>제목</label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="멋진 제목을 입력하세요"
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                {!id && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>작성자</label>
                        <input 
                            type="text" 
                            name="author" 
                            placeholder="당신의 이름은 무엇인가요?"
                            value={formData.author} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>내용</label>
                    <textarea 
                        name="content" 
                        placeholder="나누고 싶은 이야기를 적어보세요..."
                        value={formData.content} 
                        onChange={handleChange} 
                        style={{ height: '250px' }}
                        required 
                    />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                        {id ? '수정 완료' : '등록하기'}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BoardForm;
