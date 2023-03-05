import { NextFunction, Request, Response, Router } from 'express';

const restaurantRoute = Router();

restaurantRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Restaurant!');
});

export { restaurantRoute };
