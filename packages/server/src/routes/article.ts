import { Router } from 'express';
import * as articleController from '../controllers/article.js';

const articleRoute = Router();

articleRoute.post('/', articleController.createArticle);

articleRoute.get('/:restaurantId', articleController.getArticlesByRestaurantId);

articleRoute.get('/:restaurantId?:userId', articleController.getArticlesByIds);

articleRoute.put('/:id', articleController.updateArticle);

export { articleRoute };
