import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import connectMongodb from './config/mongo';

// **** Run **** //

connectMongodb()
  .then(() => {
    logger.info('Connected to MongoDB');
    server.listen(EnvVars.Port, () => {
      logger.info(`Server is running at http://localhost:${EnvVars.Port}`);
    });
  })
  .catch((err) => logger.err('Error connecting to database:' + err));
