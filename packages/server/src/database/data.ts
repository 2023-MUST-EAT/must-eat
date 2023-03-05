interface Article {
  id?: number;
  userId: number;
  restaurantId: number;
  content: string;
  path: string;
}

const test_article1: Article = {
  id: 1,
  userId: 1,
  restaurantId: 1,
  content: '맛있다!!',
  path: '대왕판교로',
};
const test_article2: Article = {
  id: 2,
  userId: 2,
  restaurantId: 1,
  content: '너무 맛있다!!!!',
  path: '대왕판교로',
};
const test_articles: Article[] = [test_article1, test_article2];

export { Article, test_articles };
