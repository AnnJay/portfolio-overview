import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "./redux";

interface UpdatedFields {
  lastPrice: string;
  priceChangePercent: string;
}
interface SocketResponse {
  stream: string;
  data: Record<string, string | number>;
}

const STREAM_POSTFIX = "usdt@ticker";

const URL = "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker";

const extractNameFromStream = (stream: string) =>
  stream.replace(STREAM_POSTFIX, "");

const generateUrl = (currency: string[]) =>
  URL + "/" + currency.join(`${STREAM_POSTFIX}/`) + STREAM_POSTFIX;

type SocketBufferedData = Record<string, UpdatedFields>;

export const useWSConnection = () => {
  const bufferedData = useRef<SocketBufferedData>({});
  const wsRef = useRef<WebSocket | null>(null);
  const [socketUrl, setSocketUrl] = useState<string>(URL);
  const { userCurrency } = useAppSelector((state) => state.userCurrency);

  const parseStreamAndWriteToBuffer = (response: SocketResponse) => {
    const name = extractNameFromStream(response.stream);
    const updatedFields: UpdatedFields = {
      lastPrice: String(response.data.c),
      priceChangePercent: String(response.data.P),
    };

    bufferedData.current[name] = updatedFields;
  };

  const handleMessage = (event: MessageEvent) => {
    try {
      parseStreamAndWriteToBuffer(JSON.parse(event.data));
    } catch (error) {
      console.error("Ошибка при парсинге сообщения:", error);
    }
  };

  useEffect(() => {
    if (userCurrency.length > 0) {
      setSocketUrl(generateUrl(userCurrency.map((cur) => cur.name)));
    }
  }, [userCurrency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ws = new WebSocket(socketUrl);
      wsRef.current = ws;

      ws.onopen = () =>
        console.log("Подключение к ws-серверу прошло успешно", socketUrl);
      ws.onmessage = (event) => handleMessage(event);
      ws.onerror = (error) =>
        console.error("Ошибка при работе с ws-сервером:", error);
      ws.onclose = () => console.log("Окончание сессии");
    }, 2000);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      clearTimeout(timer);
    };
  }, [socketUrl]);

  return { bufferedData };
};
