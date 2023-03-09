import { Router } from 'express';
import * as articleController from './article.controller.js';

const articleRoute = Router();

articleRoute.get('/:restaurantId', articleController.getArticlesById);

articleRoute.post('/', articleController.createArticle);

articleRoute.put('/:id', articleController.updateArticle);

articleRoute.delete('/:id', articleController.deleteArticle);

export { articleRoute };
