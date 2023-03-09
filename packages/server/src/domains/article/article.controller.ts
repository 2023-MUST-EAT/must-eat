import { Request, Response } from 'express';
import * as articleService from './article.service.js';

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

const getArticlesById = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { userId } = req.query;

  const reqParam = userId
    ? { restaurantId: Number(restaurantId), userId: Number(userId) }
    : { restaurantId: Number(restaurantId) };

  const data = await articleService
    .getArticlesById(reqParam)
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

const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;

  let message;
  await articleService
    .deleteArticle(Number(id), Number(userId))
    .catch((e) => (message = e));

  if (message === 'Article does not belong to the user!')
    return res.status(403).json({ message });

  if (message === 'Article does not exist!')
    return res.status(404).json({ message });

  res.sendStatus(204);
};

export { createArticle, getArticlesById, updateArticle, deleteArticle };
