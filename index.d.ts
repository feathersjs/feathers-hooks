import * as feathers from 'feathers';

interface Hook {
  <T>(hook: HookProps<T>): Promise<any> | void;
}

interface HookProps<T> {
  method?: string;
  type: 'before' | 'after';
  params?: any;
  data?: T;
  result?: T;
  app?: feathers.Application;
}

interface HookMap {
  all?: Hook | Hook[];
  find?: Hook | Hook[];
  get?: Hook | Hook[];
  create?: Hook | Hook[];
  update?: Hook | Hook[];
  patch?: Hook | Hook[];
  remove?: Hook | Hook[];
}

type HookType = HookMap | ((hooks: HookMap) => void);

declare module 'feathers' {
  interface Service<T> {
    before: HookType;
    after: HookType;
  }
}

declare function hooks(): () => void;

declare namespace hooks{}
export = hooks;
