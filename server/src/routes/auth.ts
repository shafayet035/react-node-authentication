import epxress from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from '../controller/auth';
const router = epxress.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

// module export is required to use this router in server\src\server.ts
module.exports = router;
