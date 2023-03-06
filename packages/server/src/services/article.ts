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

const getArticlesById = async ({
  restaurantId,
  userId,
}: {
  restaurantId: number;
  userId?: number;
}): Promise<Article[]> => {
  if (userId) {
    return test_articles.filter(
      (article) =>
        article.restaurantId === restaurantId && article.userId === userId,
    );
  }

  return test_articles.filter(
    (article) => article.restaurantId === restaurantId,
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

const deleteArticle = async (
  id: number,
  userId: number,
): Promise<{ message: string } | void> => {
  const index = test_articles.findIndex((article) => article.id === id);

  if (index === -1) throw 'Article does not exist!';

  if (!test_articles.find((article) => article.userId === userId))
    throw 'Article does not belong to the user!';

  test_articles.splice(index, 1);
  return;
};

export { creatArticle, getArticlesById, updateArticle, deleteArticle };
