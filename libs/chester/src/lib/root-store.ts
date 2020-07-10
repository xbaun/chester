import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Action } from './action';
import { Store } from './store';
import { Constructor } from './type-utils';
import { classOf } from './utils/class-of';
import { disposed } from './utils/disposed';

export class RootStore {

  static readonly instance = new RootStore();


  protected readonly _attached = new Map<Constructor<Store<any>>, { store: Store<any>, subscription: Subscription }>();

  protected readonly _disposed = disposed();

  protected readonly _dispatch$ = new Subject<{ store: Store<any>, action: Action<Store<any>, any, any> }>();


  protected constructor() {

    this._dispatch$.pipe(takeUntil(this._disposed.value$)).subscribe((args) => this.apply(args))

  }


  /**
   * Attach a Store to the RootStore.
   * @param store
   */
  attach(store: Store<any>) {

    const subscription = store.dispatch$
      .pipe(
        takeUntil(this._disposed.value$),
        finalize(() => {
          this._attached.delete(Object.getPrototypeOf(store).constructor);
        })
      )
      .subscribe(action => {
        this._dispatch$.next({ store, action });
      });

    this._attached.set(Object.getPrototypeOf(store).constructor, { store, subscription });

  }

  /**
   * Detach Store from RootStore.
   * @param store
   */
  detach(store: Store<any>) {

    const klass = classOf(store);
    const entry = this._attached.get(klass);

    if (entry) {
      this._attached.delete(klass);
      entry.subscription.unsubscribe();
    }
  }


  protected apply({ store, action }: { store: Store<any>, action: Action<Store<any>, any, any> }) {
    store.apply(action);
  }


  dispose() {
    this._disposed.true();
  }


}
