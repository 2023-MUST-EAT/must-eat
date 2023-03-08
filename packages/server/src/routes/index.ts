import { Router } from 'express';
import { articleRoute } from './article.js';
import { restaurantRoute } from './restaurant.js';

const routes = Router();

/**
 * @openapi
 * /restaurant:
 *   get:
 *     tags:
 *       - 맛집
 *     responses:
 *       200:
 *         description: 맛집 정보 반환
 *   post:
 *     tags:
 *       - 맛집
 *     description: 맛집 정보 등록
 *     responses:
 *       201:
 *         description: 맛집 정보 등록 성공
 */
routes.use('/restaurant', restaurantRoute);

/**
 * @openapi
 * /article:
 *   get:
 *     tags:
 *       - 포스트(일기)
 *     responses:
 *       200:
 *         description: 맛집에 등록된 모든 포스트(일기) 정보 반환
 *   post:
 *     tags:
 *       - 포스트(일기)
 *     description: 전달받은 맛집에 포스트(일기) 정보 등록
 *     responses:
 *       201:
 *         description: 포스트 정보 등록 성공
 *   put:
 *     tags:
 *       - 포스트(일기)
 *     description: 포스트 정보 수정
 *     responses:
 *       201:
 *         description: 포스트 정보 수정 성공
 *   delete:
 *     tags:
 *       - 포스트(일기)
 *     description: 포스트 정보 삭제
 *     responses:
 *       204:
 *         description: 포스트 정보 삭제 성공
 */
routes.use('/article', articleRoute);

export { routes };
