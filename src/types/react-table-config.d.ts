import {
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseRowSelectOptions,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectState,
  UseRowSelectRowProps
} from 'react-table';

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<
    D extends Record<string, unknown>
  > extends UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any>,
      UseRowSelectOptions<D> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseRowSelectHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByInstanceProps<D>,
      UseRowSelectInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByState<D>,
      UseRowSelectState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnProps<D> {}

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    V = any
  > {}

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseRowSelectRowProps<D> {}
}
