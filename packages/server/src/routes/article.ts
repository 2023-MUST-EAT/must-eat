import { Router } from 'express';
import * as articleController from '../controllers/article.js';

const articleRoute = Router();

articleRoute.post('/', articleController.createArticle);
articleRoute.get(
  '/all?:restaurantId',
  articleController.getArticlesByRestaurantId,
);
articleRoute.get('/:restaurantId&:userId', articleController.getArticlesByIds);

export { articleRoute };
