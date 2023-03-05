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

const getArticleById = async ({
  restaurantId,
  userId,
}: {
  restaurantId: string;
  userId: string;
}): Promise<Article> => {
  console.log(
    `return get Article by restaurantId! ${restaurantId} & ${userId}`,
  );
  return test_articles[0];
};

export { creatArticle, getArticleById };
