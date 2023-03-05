import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import * as articleController from '../../controllers/article';
import { Article } from '../../database/data';

describe('Article Controller', () => {
  let articleService: any;
  beforeEach(() => {
    articleService = {};
  });
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
      articleService.createArticle = jest.fn(() => article);

      // when
      await articleController.createArticle(req, res);

      // then
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual({ id: 1, ...article });
    });
  });

  // it('get article by restaurant id', async () => {
  //   // given
  //   // const restaurantId = faker.random.alphaNumeric(16);
  //   // const userId = faker.random.alphaNumeric(16);
  //   const restaurantId = 1;
  //   const userId = 1;
  //   const req = httpMocks.createRequest({ query: { restaurantId, userId } });
  //   const res = httpMocks.createResponse();
  //   const article = {
  //     // id: faker.random.alphaNumeric(16),
  //     // content: faker.random.words(5),
  //     // path: faker.system.directoryPath(),
  //     id: 1,
  //     userId,
  //     restaurantId,
  //     content: '맛있다!!',
  //     path: '대왕판교로',
  //   };
  //   articleService.getArticleById = jest.fn(() => article);

  //   // when
  //   await articleController.getArticleById(req, res);

  //   // then
  //   console.log(res._getJSONData());
  //   expect(res.statusCode).toBe(200);
  //   expect(res._getJSONData()).toEqual(article);
  // });

  // 수정

  // 삭제
});
