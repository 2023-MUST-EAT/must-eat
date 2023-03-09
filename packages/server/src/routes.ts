import { Router } from 'express';
import { articleRoute } from './domains/article/article.route.js';
import { restaurantRoute } from './domains/restaurant/restaurant.route.js';

const routes = Router();

routes.use('/restaurant', restaurantRoute);
routes.use('/article', articleRoute);

export { routes };
