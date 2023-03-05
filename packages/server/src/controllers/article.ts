import { Request, Response } from 'express';
import * as articleService from '../services/article.js';

const createArticle = async (req: Request, res: Response) => {
  try {
    const { restaurantId, userId, content, path } = req.body;
    const data = await articleService
      .creatArticle({
        restaurantId,
        userId,
        content,
        path,
      })
      .catch(() => console.error);

    if (!data) res.status(404).send('Restaurant does not exist!');
    res.status(201).send(data);
  } catch (e) {
    console.error(e);
  }
};

const getArticleById = async (req: Request, res: Response) => {
  const { restaurantId, userId } = req.params;
  const data = await articleService.getArticleById({ restaurantId, userId });
  res.status(200).json(data);
};

export { createArticle, getArticleById };
