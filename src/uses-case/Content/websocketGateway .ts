// websocket.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('message', data); 
  }
}
