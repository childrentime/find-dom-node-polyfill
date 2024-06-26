import type { ReactInstance } from "react";

export type Input = ReactInstance | null | undefined;
export type Output = Element | null | Text;
export type Fiber = {
  tag: WorkTag;
  key: null | string;
  elementType: any;
  type: any;
  stateNode: any;
  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;
  ref: null | (((handle: mixed) => void) & { _stringRef: string | null });
  refCleanup: null | (() => void);
  pendingProps: any;
  memoizedProps: any;
  updateQueue: any; // Update with specific type when known
  memoizedState: any;
  dependencies: Dependencies | null;
  mode: TypeOfMode;
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Fiber[] | null;
  lanes: Lanes;
  childLanes: Lanes;
  alternate: Fiber | null;
  actualDuration?: number;
  actualStartTime?: number;
  selfBaseDuration?: number;
  treeBaseDuration?: number;
  _debugInfo?: ReactDebugInfo | null;
  _debugOwner?: ReactComponentInfo | Fiber | null;
  _debugStack?: string | Error | null;
  _debugTask?: ConsoleTask | null;
  _debugIsCurrentlyTiming?: boolean;
  _debugNeedsRemount?: boolean;
  _debugHookTypes?: HookType[] | null;
};

type ReactDebugInfo = any;
type ReactComponentInfo = any;
type ConsoleTask = any;
type mixed = any;
type Dependencies = any;
type TypeOfMode = number;
type Flags = number;
type Lanes = number;
type HookType =
  | "useState"
  | "useReducer"
  | "useContext"
  | "useRef"
  | "useEffect"
  | "useEffectEvent"
  | "useInsertionEffect"
  | "useLayoutEffect"
  | "useCallback"
  | "useMemo"
  | "useImperativeHandle"
  | "useDebugValue"
  | "useDeferredValue"
  | "useTransition"
  | "useSyncExternalStore"
  | "useId"
  | "useCacheRefresh"
  | "useOptimistic"
  | "useFormState"
  | "useActionState";
type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29;
