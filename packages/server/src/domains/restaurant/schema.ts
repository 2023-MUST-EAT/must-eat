export type RestaurantData = {
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

export type Repository = {
  restaurants: RestaurantData[];
  count: number;
}


export const RestaurantRepository: Repository = {
  restaurants: [],
  count: 0
}

