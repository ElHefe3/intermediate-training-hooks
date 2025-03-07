import isNil from 'lodash/isNil';

function setItem(key: string, value: string | object): void {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(key, value);
}

function getItem(key: string): string | object | null {
  if (!isNil(localStorage.getItem(key))) {
    const storageObjectString = localStorage.getItem(key) ?? '';
    try {
      return JSON.parse(storageObjectString) as string | object | null;
    } catch {
      return storageObjectString;
    }
  }
  return null;
}

function removeItem(key: string): void {
  return localStorage.removeItem(key);
}

function clear(): void {
  return localStorage.clear();
}

export default { setItem, getItem, removeItem, clear };
