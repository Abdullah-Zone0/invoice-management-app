import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { query } from '../db';
const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  query(sql, [email], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = result[0];
    compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      // const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, email: user.email } });
    });
  });
});

export default router;
