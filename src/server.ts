import express, { Router } from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { SpecificationsRoutes } from './routes/specifications.routes';
import { router } from "./routes/index.routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Router);

app.listen(3333, () => {
    console.log('Server is Running');
});