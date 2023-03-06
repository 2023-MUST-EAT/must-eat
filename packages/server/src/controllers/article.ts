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

const getArticlesByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.query;
  const data = await articleService
    .getArticlesByRestaurantId(Number(restaurantId))
    .catch((e) => console.error(e));

  // 추후 검증 로직 수정
  if (data?.length === 0) return res.sendStatus(404);

  res.status(200).json(data);
};

const getArticlesByIds = async (req: Request, res: Response) => {
  const { restaurantId, userId } = req.query;
  const data = await articleService
    .getArticleById({
      restaurantId: Number(restaurantId),
      userId: Number(userId),
    })
    .catch((e) => console.error(e));

  if (data?.length === 0) return res.sendStatus(404);

  res.status(200).json(data);
};

export { createArticle, getArticlesByRestaurantId, getArticlesByIds };
