import { Store } from './store';
import { Constructor } from './type-utils';

export abstract class Action<TStore extends Store<any>, TType extends string, TArgs extends (...args: any[]) => void> {

  /* @internal */
  readonly __STORE__?: TStore;

  /* @internal */
  readonly __ARGS__?: TArgs;

  readonly bound?: Constructor<TStore>;

  protected constructor(
    readonly type: TType,
    readonly args: Action.ArgsOf<Action<TStore, TType, TArgs>>
  ) {

  }

  abstract reduce(state: Store.StateOf<TStore>): Store.StateOf<TStore>;


}

export namespace Action {
  export type ArgsOf<TAction extends Action<Store<any>, any, any>> = Parameters<NonNullable<TAction['__ARGS__']>>
}



// TYPE
// ARGS
