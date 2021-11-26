import express, { Request, Response } from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
    return response.json({message: "hello world"})
});


app.listen(3333, () => {
    console.log('Server is Running');
});