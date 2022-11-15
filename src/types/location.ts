/* eslint-disable no-restricted-globals */
export function redirect(path: string) {
  location.hash = `/${path}`;
}
