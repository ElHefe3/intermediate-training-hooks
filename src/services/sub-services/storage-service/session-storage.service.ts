import isNil from 'lodash/isNil';

function setItem(key: string, value: string | object): void {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return sessionStorage.setItem(key, value);
}

function getItem(key: string): string | object | null {
  if (!isNil(sessionStorage.getItem(key))) {
    const storageObjectString = sessionStorage.getItem(key) ?? '';
    try {
      return JSON.parse(storageObjectString) as string | object | null;
    } catch {
      return storageObjectString;
    }
  }
  return null;
}

function removeItem(key: string): void {
  return sessionStorage.removeItem(key);
}

function clear(): void {
  return sessionStorage.clear();
}

export default { setItem, getItem, removeItem, clear };
