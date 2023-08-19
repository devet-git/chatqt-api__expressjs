import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import 'express-async-errors';
// import BaseRouter from '@src/routes/api';
import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { NodeEnvs } from '@src/constants/misc';
import { ResponseObject, RouteError } from '@src/other/classes';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiv1 from './routes/api/v1';

// **** Variables **** //
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on('connection', (socket) => {
  logger.info(`Connecting to client with id: ${socket.id}`);
  socket.on('new mess', (arg) => logger.info(arg));
});

// httpServer.listen(8081);
// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));
app.use(cors());

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use('/api/v1', apiv1);

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);

// TODO: Global handler exception
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) next();
  res.status(500).json(ResponseObject.error({ errors: error.message }));
});

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// // Nav to login pg by default
// app.get('/', (_: Request, res: Response) => {
//   res.sendFile('login.html', { root: viewsDir });
// });

// // Redirect to login if not logged in.
// app.get('/users', (req: Request, res: Response) => {
//   const jwt = req.signedCookies[EnvVars.CookieProps.Key];
//   if (!jwt) {
//     res.redirect('/');
//   } else {
//     res.sendFile('users.html', { root: viewsDir });
//   }
// });

// **** Export default **** //

export default httpServer;
