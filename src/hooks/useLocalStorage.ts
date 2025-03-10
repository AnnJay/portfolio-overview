import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Ошибка при чтении значения из localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(key, item);
    } catch (error) {
      console.error("Ошибка при записи значения в localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};
