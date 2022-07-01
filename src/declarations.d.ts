import { FunctionComponent } from 'react';
declare module 'react' {
  export type StatelessComponent<P = Record<string, unknown>> = FunctionComponent<P>;
}
