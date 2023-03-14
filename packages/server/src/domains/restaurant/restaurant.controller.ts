import { Request, Response } from "express";

import { RestaurantRepository } from './schema.js';
import * as restaurantService from './restaurant.service.js'


export function getAllRestaurants(req:Request, res:Response){
    restaurantService.getAllRestaurantData()
        .then( (restaurantData)=> {
            res.status(200).json(restaurantData);
        });
    
    return;
}

export function getRestaurant(req: Request, res: Response){
    const id = Number(req.params.id);

    restaurantService.getRestaurantData(id)
    .then(restaurantData => {
        res.status(200).json(restaurantData);
    }).catch( err => {
        res.status(404).json({
            message: err.message
        })
    })
    return;
}

export function registerRestaurant(req: Request, res: Response){
    const { name, address, imageUrl, category, phone, homepage, kakaoId, menus } = req.body;

    restaurantService.registerRestaurant({name, address, imageUrl, category, phone, homepage, kakaoId, menus})
    .then( ()=> {
        res.status(201).json({
            message: 'Success'
        })
    }).catch( err => {
        res.status(409).json({
            message: err.message
        })
    })
}

// TODO sum to save
// export function updateRestaurant(req: Request, res: Response){
//     const { id } = req.params;
//     const { name, address, image_url, category, phone, homepage, kakaoId, menus } = req.body;

//     const updateData: RestaurantData = {
//         name,
//         address,
//         imageUrl: image_url,
//         category,
//         phone,
//         homepage,
//         kakaoId: Number(kakaoId),
//         menus
//     }

//     const findIndex = RestaurantRepository.restaurants.findIndex(restaurant => restaurant.id === Number(id));
    
    
//     if( findIndex === -1 ){
//         res.status(404).json({
//             message: 'Not found'  
//         });

//         return;
//     }

//     RestaurantRepository[findIndex] = updateData;

//     res.status(200).json({
//         message: 'Success Update'
//     });

//     return;
// }

export function deleteRestaurant(req: Request, res: Response){
    const id = Number(req.params.id);

    restaurantService.deleteRestaurant(id);


    res.send(204).json({
        message: 'delete Success'
    });
}