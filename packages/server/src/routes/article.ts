import { Router } from 'express';
import * as articleController from '../controllers/article.js';

const articleRoute = Router();

articleRoute.post('/', articleController.createArticle);
articleRoute.get('/', articleController.getArticleById);

export { articleRoute };
