import epxress from 'express';

import { CustomRequest, verifyToken } from '../middleware/verifyToken';
const router = epxress.Router();

router.post('/test', verifyToken, (req: CustomRequest, res) => {
  console.log(req.userId);

  return res.status(200).json({ message: 'Protected route' });
});

module.exports = router;
