import epxress from 'express';

import { CustomRequest, verifyToken } from '../middleware/verifyToken';
import { User } from '../model/user';
const router = epxress.Router();

router.get('/user', verifyToken, async (req: CustomRequest, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({
      isAuthorized: true,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
});

module.exports = router;
