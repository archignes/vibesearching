/**
 * @file useClickOutside.ts
 * @description A custom hook for handling clicks outside a referenced element.
 */

import { useEffect } from "react";

/**
 * useClickOutside hook.
 * @param ref - The ref of the element to detect outside clicks for.
 * @param callback - The callback function to invoke on an outside click.
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
