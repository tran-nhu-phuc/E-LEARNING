import express, { Request, Response } from 'express';
import { config } from 'dotenv'
import { routers } from './routers/routers';
import sequelize from './configs/db.config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import { createEntity } from './entities/index.entity';

config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({
  origin: ["https://project-elearning-henna.vercel.app"],
  credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "e-learning",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

routers(app)
createEntity();
sequelize.authenticate();
app.listen(port, () => {
  console.log(`app listen on http://localhost:${port}`);
})