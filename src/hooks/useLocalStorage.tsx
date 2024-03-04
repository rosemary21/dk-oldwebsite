import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialvalue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const localValue = localStorage.getItem(key);
    if (localValue !== null) return JSON.parse(localValue);

    if (typeof initialvalue == "function") {
      return (initialvalue as () => T)();
    } else {
      return initialvalue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
