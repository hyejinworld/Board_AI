const db = require('../db');

exports.getAllBoards = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM board ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBoardById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM board WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBoard = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO board (title, content, author) VALUES (?, ?, ?)',
            [title, content, author]
        );
        res.status(201).json({ id: result.insertId, title, content, author });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBoard = async (req, res) => {
    const { title, content } = req.body;
    try {
        await db.query(
            'UPDATE board SET title = ?, content = ? WHERE id = ?',
            [title, content, req.params.id]
        );
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBoard = async (req, res) => {
    try {
        await db.query('DELETE FROM board WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
