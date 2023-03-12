import { Request, Response } from "express";

let RestaurantRepository: Array<RestaurantData> = []

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

export function getAllRestaurants(req:Request, res:Response){
    res.status(200).json(RestaurantRepository);
    return;
}

export function getRestaurant(req: Request, res: Response){
    const id = Number(req.params.id);
    
    const findData = RestaurantRepository.find( restaurant => restaurant.id === id );

    if( !findData ){
        res.status(404).send('No Data');
        return;
    }

    res.status(200).json(findData);
    return;
}

export function registerRestaurant(req: Request, res: Response){
    const { name, address, image_url, category, phone, homepage, kakaoId, menus } = req.body;

    const dupCheck = RestaurantRepository.find( restaurant => restaurant.kakaoId === kakaoId);

    if( dupCheck ){
        res.status(409).json({message: 'Success'});
    }

    const newData: RestaurantData = {
        name,
        address,
        imageUrl: image_url,
        category,
        phone,
        homepage,
        kakaoId: Number(kakaoId),
        menus
    }

    RestaurantRepository.push(newData);

    res.status(201).json({
        message: 'Success'
    })
}

export function updateRestaurant(req: Request, res: Response){
    const { id } = req.params;
    const { name, address, image_url, category, phone, homepage, kakaoId, menus } = req.body;

    const updateData: RestaurantData = {
        name,
        address,
        imageUrl: image_url,
        category,
        phone,
        homepage,
        kakaoId: Number(kakaoId),
        menus
    }

    const findIndex = RestaurantRepository.findIndex(restaurant => restaurant.id === Number(id));
    
    
    if( findIndex === -1 ){
        res.status(404).json({
            message: 'Not found'  
        });

        return;
    }

    RestaurantRepository[findIndex] = updateData;

    res.status(200).json({
        message: 'Success Update'
    });

    return;
}

export function deleteRestaurant(req: Request, res: Response){
    const { id } = req.params;

    const findData = RestaurantRepository.find( restaurant => restaurant.id === Number(id) );

    if( !findData ){
        res.status(400).json({
            message: ""
        })
    }

    RestaurantRepository = RestaurantRepository.filter( restaurant => restaurant.id !== Number(id));

    res.send(204).json({
        message: 'delete Success'
    });
}