import { Socket } from 'socket.io';
interface CallbackFunc<type> {
  (...param: type[]): void;
}
export default class MessageEvent {
  private socket: Socket;

  public constructor(socket: Socket) {
    this.socket = socket;
  }

  public sendMessage(message: string) {
    this.socket.emit('newMessage', message, '1234');
  }
  public receiveMessage(callback?: CallbackFunc<string>) {
    this.socket.on(
      'newMessage',
      (
        message: string,
        sendToClient: (response: { status: string }) => void
      ) => {
        callback && callback(message);
        sendToClient({ status: 'OK' });
      }
    );
  }
}
