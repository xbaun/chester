import { Action } from '../action';
import { Store } from '../store';

export class ØØInit<TStore extends Store<any>> extends Action<TStore, 'ØØInit', (state: Partial<Store.StateOf<TStore>>) => void> {

  constructor(
    ...args: Action.ArgsOf<ØØInit<TStore>>
  ) {
    super('ØØInit', args);
  }

  reduce(state: Store.StateOf<TStore>): Store.StateOf<TStore> {
    console.log(`${this.type}: ${JSON.stringify(this.args)}, ${JSON.stringify(state)}`);
    return { ...state };
  }

}
