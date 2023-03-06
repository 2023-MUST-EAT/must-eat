import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import * as articleController from '../../controllers/article';
import { Article, test_articles } from '../../database/data';

describe('Article Controller', () => {
  let req;
  let res;

  describe('create article', () => {
    let article: Article;
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    beforeEach(() => {
      // const restaurantId = faker.datatype.number(16);
      const restaurantId = 1;
      const userId = faker.datatype.number(16);
      const content = faker.random.words(10);
      const path = faker.system.directoryPath();
      req = httpMocks.createRequest({
        body: { restaurantId, userId, content, path },
      });
      res = httpMocks.createResponse();
    });

    it('returns 201 with created article', async () => {
      // given
      article = {
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        content: req.body.content,
        path: req.body.path,
      };

      // when
      await articleController.createArticle(req, res);

      // then
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual({ id: 1, ...article });
    });
  });

  describe('read article', () => {
    it("get restaurant's all articles by restaurant id", async () => {
      // given
      const restaurantId = 1; // db access
      req = httpMocks.createRequest({ query: { restaurantId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesByRestaurantId(req, res);

      // then
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(
        test_articles.filter(
          (article) => article.restaurantId === restaurantId,
        ),
      );
    });

    it('returns 404 when there is no article with given restaurant id', async () => {
      // given
      const restaurantId = 0; // db access
      req = httpMocks.createRequest({ query: { restaurantId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesByRestaurantId(req, res);

      // then
      expect(res.statusCode).toBe(404);
    });

    it('get article by restaurant id and user id', async () => {
      // given
      const restaurantId = 1;
      const userId = 1;
      req = httpMocks.createRequest({ query: { restaurantId, userId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesByIds(req, res);

      // then
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(
        test_articles.filter(
          (article) =>
            article.userId === userId && article.restaurantId === restaurantId,
        ),
      );
    });

    it('returns 404 when there is no article with given restaurant and user ids', async () => {
      // given
      const restaurantId = 0; // db access
      const userId = 0;
      req = httpMocks.createRequest({ query: { restaurantId, userId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesByRestaurantId(req, res);

      // then
      expect(res.statusCode).toBe(404);
    });
  });

  // 수정

  // 삭제
});
