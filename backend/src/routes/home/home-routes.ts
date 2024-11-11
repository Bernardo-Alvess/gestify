import { Router } from 'express';
import { homeController } from '../../controllers/HomeController';
import { auth } from '../../middleware/auth';

const homeRouter = Router();

homeRouter.get('/', auth, (req, res, next) => {
    homeController.getHomeStats(req, res, next);
});

export { homeRouter };