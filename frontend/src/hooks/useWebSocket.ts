import { useEffect } from 'react';
import { useWebSocketStore } from '../store/websocketStore';

export const useWebSocket = (pipelineId: string) => {
  const connect = useWebSocketStore((state) => state.connect);
  const disconnect = useWebSocketStore((state) => state.disconnect);

  useEffect(() => {
    if (pipelineId) {
      connect(pipelineId);
    }

    return () => {
      disconnect();
    };
  }, [pipelineId, connect, disconnect]);
};