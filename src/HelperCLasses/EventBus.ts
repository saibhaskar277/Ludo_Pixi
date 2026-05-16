import { GameEventMap } from "../GameConfigs/GameEvents";

type EventCallback<T = void> = T extends void ? () => void : (data: T) => void;

export class TypedEventBus<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: EventCallback<T[K]>[];
  } = {};

  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    const callbacks = this.listeners[event];

    if (!callbacks) return;

    this.listeners[event] = callbacks.filter((cb) => cb !== callback);
  }

  emit<K extends keyof T>(event: K, ...data: T[K] extends void ? [] : [T[K]]) {
    this.listeners[event]?.forEach((cb) => {
      if (data.length > 0) {
        (cb as any)(data[0]);
      } else {
        (cb as any)();
      }
    });
  }

  once<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    const onceCallback = ((...args: any[]) => {
      (callback as any)(...args);

      this.off(event, onceCallback as EventCallback<T[K]>);
    }) as EventCallback<T[K]>;

    this.on(event, onceCallback);
  }

  clear(event?: keyof T) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }
}

export const EventBus = new TypedEventBus<GameEventMap>();
