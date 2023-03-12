import { NextFunction, Request, Response, Router } from 'express';
import * as restaurantController from '../restaurant/restaurant.controller.js';

const restaurantRoute = Router();

restaurantRoute.get('/', restaurantController.getAllRestaurants);

restaurantRoute.get('/:id', restaurantController.getRestaurant);

restaurantRoute.post('/', restaurantController.registerRestaurant);

restaurantRoute.delete('/:id', restaurantController.deleteRestaurant);

export { restaurantRoute };
