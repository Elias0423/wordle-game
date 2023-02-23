import { Router } from 'express';

import auth from './auth.routes';
import users from './user.routes';
import games from './game.routes';

const router = Router();
const path = '/api/v1/';

router.use(auth);
router.use(`${path}users`, users);
router.use(`${path}games`, games);

// Not Found
router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado. :(', info: null });
});

export default router;
