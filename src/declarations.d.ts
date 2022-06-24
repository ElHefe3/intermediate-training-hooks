import { FunctionComponent } from 'react';
declare module 'react' {
  export interface StatelessComponent<P = {}> extends FunctionComponent<P> {}
}
