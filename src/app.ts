import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import studentRouter from './app/modules/student/student.route';
const app:Application = express();

app.use(express.json());
app.use(cors())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use('/students',studentRouter);


export default app;
