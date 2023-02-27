import express from 'express'
const app = express();
import bookRouter from './room.router'

export default app.use('/v1', bookRouter);