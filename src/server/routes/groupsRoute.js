import express from 'express';

const router = express.Router();

router.get('/active', (req, res, next) => {
  res.status(200).json(null);
});

export default router;