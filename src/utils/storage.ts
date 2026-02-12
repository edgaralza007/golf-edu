const STORAGE_KEY = 'golf-edu-user';

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

export function loadUser<T>(fallback: T): T {
  return loadFromStorage(STORAGE_KEY, fallback);
}

export function saveUser<T>(value: T): void {
  saveToStorage(STORAGE_KEY, value);
}
