import { useState, useEffect } from "react";

type UseLocalStorageReturnValue<T> = [
  T | undefined,
  (value: T | ((val: T | undefined) => T)) => void,
  () => void
];

const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): UseLocalStorageReturnValue<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T | undefined) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(undefined);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
