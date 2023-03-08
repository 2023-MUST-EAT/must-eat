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
const test_article3: Article = {
  id: 3,
  userId: 2,
  restaurantId: 2,
  content: '너무 맛있다!!!!',
  path: '대왕판교로',
};
const test_article4: Article = {
  id: 4,
  userId: 3,
  restaurantId: 3,
  content: '너무 맛있다!!!!',
  path: '대왕판교로',
};
const test_articles: Article[] = [
  test_article1,
  test_article2,
  test_article3,
  test_article4,
];

export { Article, test_articles };
