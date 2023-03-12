import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import * as articleController from '../../domains/article/article.controller';
import { Article, test_articles } from '../../database/data';

describe('Article Controller', () => {
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;

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
      expect(res._getJSONData()).toMatchObject({ id: 1, ...article });
    });
  });

  describe('read article', () => {
    it("get restaurant's all articles by restaurant id", async () => {
      // given
      const restaurantId = 1; // db access
      req = httpMocks.createRequest({ params: { restaurantId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesById(req, res);

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
      req = httpMocks.createRequest({ params: { restaurantId } });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesById(req, res);

      // then
      expect(res.statusCode).toBe(404);
    });

    it('get article by restaurant id and user id', async () => {
      // given
      const restaurantId = 1;
      const userId = 1;
      req = httpMocks.createRequest({
        params: { restaurantId },
        query: { userId },
      });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesById(req, res);

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
      req = httpMocks.createRequest({
        params: { restaurantId },
        query: { userId },
      });
      res = httpMocks.createResponse();

      // when
      await articleController.getArticlesById(req, res);

      // then
      expect(res.statusCode).toBe(404);
    });
  });

  describe('update article', () => {
    let toUpdate: Article;
    beforeEach(() => {
      res = httpMocks.createResponse();
    });

    it('updates article and return 200', async () => {
      // given
      toUpdate = {
        id: 1,
        restaurantId: 1,
        userId: 1,
        content: faker.random.words(5),
        path: faker.system.directoryPath(),
      };
      req = httpMocks.createRequest({
        params: { id: toUpdate.id },
        body: toUpdate,
      });

      // when
      await articleController.updateArticle(req, res);

      // then
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({
        content: toUpdate.content,
        path: toUpdate.path,
      });
    });

    it('returns 403 and should not update if the article does not belong to the user', async () => {
      // given
      toUpdate = {
        id: 1,
        restaurantId: 1,
        userId: 3,
        content: faker.random.words(5),
        path: faker.system.directoryPath(),
      };
      req = httpMocks.createRequest({
        params: { id: toUpdate.id },
        body: toUpdate,
      });

      // when
      await articleController.updateArticle(req, res);

      // then
      expect(res.statusCode).toBe(403);
      expect(res._getJSONData()).toMatchObject({
        message: 'user id is not matching!',
      });
    });

    it('returns 404 and should not update if the article does not exist', async () => {
      // given
      toUpdate = {
        id: 12345,
        restaurantId: 1,
        userId: 1,
        content: faker.random.words(5),
        path: faker.system.directoryPath(),
      };
      req = httpMocks.createRequest({
        params: { id: toUpdate.id },
        body: toUpdate,
      });

      // when
      await articleController.updateArticle(req, res);

      // then
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toMatchObject({
        message: 'article not found!',
      });
    });
  });

  describe('delete article', () => {
    let articles: Article[];
    const beforeArticles = [...test_articles]; // 이전 테스트 영향을 제거하기 위한 초기화용 배열
    beforeEach(() => {
      res = httpMocks.createResponse();
      test_articles.splice(0, test_articles.length);
      beforeArticles.forEach((article) => test_articles.push(article));
    });

    it('returns 204 and remove the article if exists', async () => {
      // given
      const id = 1;
      const userId = 1;
      req = httpMocks.createRequest({
        params: { id },
        query: { userId },
      });

      // when
      await articleController.deleteArticle(req, res);

      // then
      expect(res.statusCode).toBe(204);
      expect(test_articles.filter((article) => article.id === id)).toHaveLength(
        0,
      );
    });

    it('returns 403 if article does not belong to the user', async () => {
      // given
      const id = 1;
      const userId = 4;
      req = httpMocks.createRequest({
        params: { id },
        query: { userId },
      });

      // when
      await articleController.deleteArticle(req, res);

      // then
      expect(res.statusCode).toBe(403);
      expect(res._getJSONData()).toMatchObject({
        message: 'Article does not belong to the user!',
      });
    });

    it('returns 404 if article does not exist', async () => {
      // given
      const id = 12345;
      const userId = 1;
      req = httpMocks.createRequest({
        params: { id },
        query: { userId },
      });

      // when
      await articleController.deleteArticle(req, res);

      // then
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toMatchObject({
        message: 'Article does not exist!',
      });
    });
  });
});