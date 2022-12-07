import { useRef, useEffect } from "react";

export function useDebounce(
  func: (...args: any[]) => void,
  delay = 1000
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args: any[]) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func(...args)
    }, delay)
  })

  return debouncedFunction;
}
