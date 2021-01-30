import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware } from './helpers/middleware';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
