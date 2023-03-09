import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import * as OpenAPIValidator from 'express-openapi-validator';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import { config } from './config/config.js';
import { routes } from './routes.js';

const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));

const openApiDoc = yaml.load('./docs/openapi.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
app.use(
  OpenAPIValidator.middleware({
    apiSpec: './docs/openapi.yml',
    validateRequests: false,
  }),
);
app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const port = config.port;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
