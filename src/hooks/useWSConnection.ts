import { useEffect, useRef, useState } from "react";

export const useWSConnection = (url: string) => {
  const [data, setData] = useState<any>(null);

  const wsRef = useRef<WebSocket | null>(null);

  const handleMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      setData(message);
    } catch (error) {
      console.error("Ошибка при парсинге сообщения:", error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("Подключение к ws-серверу прошло успешно");
    ws.onmessage = (event) => handleMessage(event);
    ws.onerror = (error) =>
      console.error("Ошибка при работе с ws-сервером:", error);
    ws.onclose = () => console.log("Окончание сессии");

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return { data };
};
