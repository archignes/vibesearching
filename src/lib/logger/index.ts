/**
 * Simple logger utility that works in Edge runtime
 */
export const logger = {
  /**
   * Log info level message
   * @param message - Main message to log
   * @param args - Additional arguments to log
   */
  info: (message: string, ...args: string[]): void => {
    console.log(`[INFO] ${message}`, ...args);
  },

  /**
   * Log warning level message
   * @param message - Main message to log
   * @param args - Additional arguments to log
   */
  warn: (message: string, ...args: string[]): void => {
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * Log error level message
   * @param message - Main message to log
   * @param args - Additional arguments to log
   */
  error: (message: string, ...args: string[]): void => {
    console.error(`[ERROR] ${message}`, ...args);
  },

  /**
   * Log debug level message
   * @param message - Main message to log
   * @param args - Additional arguments to log
   */
  debug: (message: string, ...args: string[]): void => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
