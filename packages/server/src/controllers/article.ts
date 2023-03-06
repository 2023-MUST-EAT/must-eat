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
    res.status(201).json(data);
  } catch (e) {
    console.error;
  }
};

const getArticlesByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const data = await articleService
    .getArticlesByRestaurantId(Number(restaurantId))
    .catch(console.error);

  // 추후 검증 로직 수정
  if (data?.length === 0) return res.sendStatus(404);

  res.status(200).json(data);
};

const getArticlesByIds = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { userId } = req.query;
  const data = await articleService
    .getArticleById({
      restaurantId: Number(restaurantId),
      userId: Number(userId),
    })
    .catch(console.error);

  if (data?.length === 0) return res.sendStatus(404);

  res.status(200).json(data);
};

const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { restaurantId, userId, content, path } = req.body;
  let message;
  const data = await articleService
    .updateArticle({
      id: Number(id),
      restaurantId,
      userId,
      content,
      path,
    })
    .catch((e) => (message = e));

  if (message === 'user id is not matching!')
    return res.status(403).json({ message });

  if (message === 'article not found!')
    return res.status(404).json({ message });

  res.status(200).json(data);
};

export {
  createArticle,
  getArticlesByRestaurantId,
  getArticlesByIds,
  updateArticle,
};
