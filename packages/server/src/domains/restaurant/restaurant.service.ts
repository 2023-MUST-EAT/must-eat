import { Repository,RestaurantData, RestaurantRepository } from './schema.js';


export function getAllRestaurantData(): Repository {
  return RestaurantRepository;
}

export function getRestaurantData(id: number): RestaurantData {
  const findData = RestaurantRepository.restaurants.find( restaurant => restaurant.id === id );

  console.log(findData);

  if( !findData ){
    throw 'Not found RestaurantData'
  }

  return findData;
}

export function registerRestaurant(inputData: RestaurantData){

  const dupCheck = RestaurantRepository.restaurants.find( restaurant => restaurant.kakaoId === inputData.kakaoId);

  if (dupCheck) {
    throw 'already registered restaurant';
  }

  RestaurantRepository.restaurants.push({id: ++RestaurantRepository.count, ...inputData});
  return;
}

export function deleteRestaurant(id: number){
  const findData = RestaurantRepository.restaurants.find( restaurant => restaurant.id === Number(id) );

  if( !findData ){
    throw 'Not Found Data'
  }

  RestaurantRepository.restaurants = RestaurantRepository.restaurants.filter( restaurant => restaurant.id !== Number(id));

  return;
}
