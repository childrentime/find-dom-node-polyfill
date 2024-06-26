import { Fiber } from "./types";

export function get(key): Fiber {
  return key?._reactInternals;
}