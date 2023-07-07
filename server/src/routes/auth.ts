import epxress from 'express';
import { register, login } from '../controller/auth';
const router = epxress.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', (req, res) => {});

// module export is required to use this router in server\src\server.ts
module.exports = router;
