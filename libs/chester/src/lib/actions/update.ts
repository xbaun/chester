import { Action } from '../action';
import { Store } from '../store';

export class Update<TStore extends Store<any>> extends Action<TStore, 'Update', (state: Partial<Store.StateOf<TStore>>) => void> {

  constructor(
    ...args: Action.ArgsOf<Update<TStore>>
  ) {
    super('Update', args);
  }

  reduce(state: Store.StateOf<TStore>): Store.StateOf<TStore> {
      console.log(`${this.type}: ${JSON.stringify(this.args)}, ${JSON.stringify(state)}`);
      return { ...state, ...this.args[0] };
  }

}
