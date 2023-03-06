import { NotFound } from 'express-openapi-validator/dist/openapi.validator.js';
import { Article, test_articles } from '../database/data.js';

// for test
let id = 0;

interface ArticleRequest {
  restaurantId: number;
  userId: number;
  content: string;
  path: string;
}

const restaurantService = {
  findById: (id: number) =>
    test_articles.filter((article) => article.restaurantId === id).length === 0
      ? undefined
      : id,
};

const creatArticle = async ({
  restaurantId,
  userId,
  content,
  path,
}: ArticleRequest): Promise<Article | string> => {
  // 맛집 게시글 확인
  if (!restaurantService.findById(restaurantId)) {
    return 'Restaurant does not exist!';
  }

  // DB 접근
  const article = { restaurantId, userId, content, path };

  return { id: ++id, ...article };
};

const getArticlesByRestaurantId = async (restaurantId: number) => {
  return test_articles.filter(
    (article) => article.restaurantId === restaurantId,
  );
};

const getArticleById = async ({
  restaurantId,
  userId,
}: {
  restaurantId: number;
  userId: number;
}): Promise<Article[]> => {
  return test_articles.filter(
    (article) =>
      article.restaurantId === restaurantId && article.userId === userId,
  );
};

const updateArticle = async (updateTo: Article): Promise<Article | void> => {
  let article: Article | undefined = test_articles.find(
    (article) => article.id === updateTo.id,
  );

  if (!article) {
    throw 'article not found!';
  }

  if (article.userId !== updateTo.userId) {
    throw 'user id is not matching!';
  }

  article = { ...updateTo };

  return article;
};

export {
  creatArticle,
  getArticlesByRestaurantId,
  getArticleById,
  updateArticle,
};
