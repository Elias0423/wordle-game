import { Router } from 'express';
import AuthService from '../services/auth.service';
import ResponseDto from '../types/responseDto';

const authService = new AuthService();
const router = Router();
const routesWithNoToken = ['/api/v1/users/login/', '/api/v1/users/singup/'];

router.use(async (req, res, next): Promise<void> => {
  if (routesWithNoToken.includes(req.url)) next();
  else if (req.headers.token && req.headers['user-id']) {
    const token = String(req.headers.token);
    const userId = Number(req.headers['user-id']);

    const response = authService.validateToken(userId, token);
    if (response) next();
    else {
      const response = new ResponseDto(401, 'Token inválido', false);
      res.status(response.code).json(response);
    }
  } else {
    const response = new ResponseDto(401, 'No se envió la información de validación', null);
    res.status(response.code).json(response);
  }
});

router.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

export default router;
