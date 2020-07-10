import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from './action';
import { ØØInit } from './actions/ØØinit';
import { RootStore } from './root-store';
import { disposed } from './utils/disposed';

export interface StoreSnapshot<TState> {

  state: TState;

  action: Action<Store<TState>, any, any>;

}

export class Store<TState> {

  /* @internal */
  readonly __STATE__!: TState;


  protected readonly _disposed = disposed();

  protected readonly _snapshot$: BehaviorSubject<StoreSnapshot<TState>>;

  protected readonly _dispatch$ = new Subject<Action<Store<TState>, string, any>>();


  readonly state$ = this._snapshot$.pipe(map(snapshot => snapshot.state));


  get state() {
    return this._snapshot$.value.state;
  }


  /* @internal */
  get dispatch$() {
    return this._dispatch$.asObservable();
  }


  constructor(state: TState) {
    this._snapshot$ = new BehaviorSubject<StoreSnapshot<TState>>({ state, action: new ØØInit(state) });
    RootStore.instance.attach(this);
  }



  dispatch(action: Action<this, string, any>) {
    this._dispatch$.next(action);
  }

  /* @internal */
  apply(action: Action<this, string, any>) {
    this._snapshot$.next({ action, state: action.reduce(this._snapshot$.value.state) })
  }

  dispose() {
    RootStore.instance.detach(this);
    this._snapshot$.complete();
    this._dispatch$.complete();
    this._disposed.true();
  }

}

export namespace Store {

  export function StateOf<TStore extends Store<any>>() {
    return void 0 as unknown as TStore['__STATE__'];
  }

  export type StateOf<TStore extends Store<any>> = TStore['__STATE__'];

}
