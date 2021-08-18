import io from 'socket.io-client';
import { useCallback } from 'react';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const backUrl = 'http://localhost:3095';

const useSocket = (workspace?: string) => {

  // socket.emit(이벤트명, 데이터) 클라에서 서버로 보내는 것
  // socket.on(이벤트명, 메소드) 서버에서 클라로 보내는 것

  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`);

  return [sockets[workspace], disconnect];
};

export default useSocket;
