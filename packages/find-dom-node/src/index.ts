import { Input, Output } from "./types";
import { get as getInstance } from "./instance-map";
import { findCurrentHostFiber } from "./fiber";

export function findDOMNode(component: Input): Output {
  if (component === null) return null;
  const fiber = getInstance(component);
  if (fiber === undefined) {
    // @ts-ignore
    if (typeof component?.render === 'function') {
      throw new Error('Unable to find node on an unmounted component.');
    } else {
      // @ts-ignore
      const keys = Object.keys(component).join(',');
      throw new Error(
        `Argument appears to not be a ReactComponent. Keys: ${keys}`,
      );
    }
  }
  const hostFiber = findCurrentHostFiber(fiber);
  if (hostFiber === null) {
    return null;
  }
  return hostFiber.stateNode;
}