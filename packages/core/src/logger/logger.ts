import isProduction from "../utils/isProduction";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogConfig {
  level: LogLevel;
  color: string;
  backgroundColor: string;
  emoji: string;
}

interface LogEntry {
  tag: string;
  title: string;
  description?: string;
  level?: LogLevel;
}

class Logger {
  private static instance: Logger;
  private minLevel: LogLevel = LogLevel.DEBUG;

  private readonly configs: Record<LogLevel, LogConfig> = {
    [LogLevel.DEBUG]: {
      level: LogLevel.DEBUG,
      color: "#6b7280",
      backgroundColor: "#f3f4f6",
      emoji: "🐛",
    },
    [LogLevel.INFO]: {
      level: LogLevel.INFO,
      color: "#3b82f6",
      backgroundColor: "#dbeafe",
      emoji: "ℹ️",
    },
    [LogLevel.WARN]: {
      level: LogLevel.WARN,
      color: "#f59e0b",
      backgroundColor: "#fef3c7",
      emoji: "⚠️",
    },
    [LogLevel.ERROR]: {
      level: LogLevel.ERROR,
      color: "#ef4444",
      backgroundColor: "#fecaca",
      emoji: "❌",
    },
  };

  private constructor() {
    // Set minimum log level based on environment
    if (isProduction()) {
      this.minLevel = LogLevel.WARN; // Only show warnings and errors in production
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatTime(): string {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  }

  private getStackTrace(): string {
    const stack = new Error().stack;
    if (!stack) return "Unknown location";

    const lines = stack.split("\n");
    // Skip Error, getStackTrace, log method, and the logger method (debug, info, etc.)
    const callerLine = lines[4] || lines[3] || "Unknown location";

    // Extract file path and line number
    const match =
      callerLine.match(/\((.+):(\d+):(\d+)\)/) ||
      callerLine.match(/at (.+):(\d+):(\d+)/);
    if (match) {
      const [, filePath, line, column] = match;
      const fileName = filePath.split("/").pop() || filePath;
      return `${fileName}:${line}:${column}`;
    }

    return callerLine.trim();
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  private log(entry: LogEntry): void {
    const level = entry.level ?? LogLevel.INFO;

    if (!this.shouldLog(level)) {
      return;
    }

    const config = this.configs[level];
    const time = this.formatTime();
    const trace = this.getStackTrace();

    // Create styled console output
    const tagStyle = `
      background: ${config.backgroundColor};
      color: ${config.color};
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 11px;
      text-transform: uppercase;
    `;

    const titleStyle = `
      color: ${config.color};
      font-weight: bold;
      font-size: 13px;
    `;

    const timeStyle = `
      color: #6b7280;
      font-size: 11px;
    `;

    const traceStyle = `
      color: #9ca3af;
      font-size: 10px;
      font-style: italic;
    `;

    const descriptionStyle = `
      color: #374151;
      font-size: 12px;
    `;

    // Log with appropriate console method based on level
    const consoleMethod = this.getConsoleMethod(level);

    if (entry.description) {
      consoleMethod(
        `%c${config.emoji} ${entry.tag}%c %c${time}%c %c${entry.title}%c\n%c${entry.description}%c\n%c📍 ${trace}%c`,
        tagStyle,
        "",
        timeStyle,
        "",
        titleStyle,
        "",
        descriptionStyle,
        "",
        traceStyle,
        ""
      );
    } else {
      consoleMethod(
        `%c${config.emoji} ${entry.tag}%c %c${time}%c %c${entry.title}%c\n%c📍 ${trace}%c`,
        tagStyle,
        "",
        timeStyle,
        "",
        titleStyle,
        "",
        traceStyle,
        ""
      );
    }
  }

  private getConsoleMethod(level: LogLevel): typeof console.log {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  public debug(tag: string, title: string, description?: string): void {
    this.log({ tag, title, description, level: LogLevel.DEBUG });
  }

  public info(tag: string, title: string, description?: string): void {
    this.log({ tag, title, description, level: LogLevel.INFO });
  }

  public warn(tag: string, title: string, description?: string): void {
    this.log({ tag, title, description, level: LogLevel.WARN });
  }

  public error(tag: string, title: string, description?: string): void {
    this.log({ tag, title, description, level: LogLevel.ERROR });
  }

  public setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  public getMinLevel(): LogLevel {
    return this.minLevel;
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Export convenience functions
export const debug = (tag: string, title: string, description?: string) =>
  logger.debug(tag, title, description);

export const info = (tag: string, title: string, description?: string) =>
  logger.info(tag, title, description);

export const warn = (tag: string, title: string, description?: string) =>
  logger.warn(tag, title, description);

export const error = (tag: string, title: string, description?: string) =>
  logger.error(tag, title, description);

export default logger;
