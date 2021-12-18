import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { SpecificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', SpecificationsRoutes);

app.listen(3333, () => {
    console.log('Server is Running');
});