import { Router } from 'express';
import * as articleController from '../controllers/article.js';

const articleRoute = Router();

articleRoute.post('/', articleController.createArticle);

articleRoute.get('/:restaurantId?:userId', articleController.getArticlesById);

articleRoute.put('/:id', articleController.updateArticle);

// 사용자 아이디는 어떻게 전달할지?
articleRoute.delete('/:id?:userId', articleController.deleteArticle);

export { articleRoute };
