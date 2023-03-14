import { Repository,RestaurantData, RestaurantRepository } from './schema.js';


export function getAllRestaurantData(): Promise<Object> {
  return new Promise( resolve=> {
    resolve(RestaurantRepository);
  });
}

export function getRestaurantData(id: number) {
  const findData = RestaurantRepository.restaurants.find( restaurant => restaurant.id === id );

  console.log(findData);

  return new Promise( (resolve, reject) => {
    if( !findData ){
      return reject(new Error('not found data'));
    }

    resolve(findData);
  })
}

export function registerRestaurant(inputData: RestaurantData){
  return new Promise( (resolve, reject)=> {
    const dupCheck = RestaurantRepository.restaurants.find( restaurant => restaurant.kakaoId === inputData.kakaoId);
    if(dupCheck){
      reject(new Error('duplication data'));
    }

    RestaurantRepository.restaurants.push({id: ++RestaurantRepository.count, ...inputData});

    resolve(null);
  })
}

export function deleteRestaurant(id: number){
  const findData = RestaurantRepository.restaurants.find( restaurant => restaurant.id === Number(id) );

  if( !findData ){
    throw 'Not Found Data'
  }

  RestaurantRepository.restaurants = RestaurantRepository.restaurants.filter( restaurant => restaurant.id !== Number(id));

  return;
}
