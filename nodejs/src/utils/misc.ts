export const appendSlash = (path: string): string => {
  return path.startsWith("/") ? path : `/${path}`;
};

export enum ReturnTypes {
  JSON = "application/json",
  Text = "text/plain",
}