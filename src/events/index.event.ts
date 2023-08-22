import logger from 'jet-logger';
import { Socket } from 'socket.io';
import MessageEvent from './message.event';

// todo: implement other event in this function
const onConnection = (socket: Socket) => {
  logger.info(`Connecting to client with socket id: ${socket.id}`);

  // todo: Add logic here
  const messageEvent = new MessageEvent(socket);
  messageEvent.receiveMessage();
};

const onDisconnect = (socket: Socket) => {
  socket.on('disconnect', (reason) => {
    logger.info(`Disconnect ${socket.id} due to ${reason}`);
  });
};

// !Do not modify this function
const eventHandler = (socket: Socket) => {
  onConnection(socket);
  onDisconnect(socket);
};

export default eventHandler;
