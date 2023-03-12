const RestaurantRepository: Repository = {
  restaurants: [],
  count: 0
}

type RestaurantData = {
  id?: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  homepage?: string;
  menus: string;
  imageUrl: string;
  kakaoId: number;
}

type Repository = {
  restaurants: RestaurantData[];
  count: number;
}