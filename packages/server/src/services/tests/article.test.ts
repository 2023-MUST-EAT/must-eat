import { faker } from '@faker-js/faker';
import { Article } from '../../database/data';
import * as articleService from '../../services/article';

describe('Article Service', () => {
  let restaurantService: any;
  beforeEach(() => {
    restaurantService = {};
  });

  describe('create article', () => {
    let restaurantId, userId, content, path, article: Article;
    beforeEach(() => {
      restaurantId = faker.datatype.number(16);
      userId = faker.datatype.number(16);
      content = faker.random.words(10);
      path = faker.system.directoryPath();
      article = { restaurantId, userId, content, path };
    });

    it('should throw 404 Error when restaurant does not exist in database', async () => {
      // given
      // restaurantService.findById = jest.fn(() => undefined);
      restaurantId = 0;

      // when
      const res = await articleService.creatArticle({
        ...article,
        restaurantId,
      });

      // then
      expect(res).toBe('Restaurant does not exist!');
    });
  });
});
