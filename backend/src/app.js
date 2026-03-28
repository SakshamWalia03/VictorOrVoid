import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import gameRouter from './routes/game.route.js';
import leaderboardRouter from './routes/leaderboard.route.js';
import config from './config/config.js';

const app = express();

app.use(cors(
    {
        origin: ['http://localhost:5173', config.frontendUrl],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ status: 'VictorOrVoid API is running' });
});
app.use('/api/game', gameRouter);
app.use('/api/leaderboard', leaderboardRouter);

export default app;