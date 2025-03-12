import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
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

  const setNewValue = (valueOrFn: T) => {
    let newValue;
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      newValue = fn(value);
    } else {
      newValue = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setNewValue];
};
