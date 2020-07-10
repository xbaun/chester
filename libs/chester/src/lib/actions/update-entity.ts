import { Action } from '../action';
import { EntityState, GetMetaEntityVal } from '../entity-state';
import { EntityStore } from '../entity-store';
import { Store } from '../store';

export class UpdateEntity<TStore extends EntityStore<EntityState<any>, any, any, any>> extends Action<TStore, 'UpdateEntity', (id: GetMetaEntityVal<EntityStore.EntityOf<TStore>, '__ID_TYPE__'>, entity: Partial<EntityStore.EntityOf<TStore>>) => void> {

  constructor(
    ...args: Action.ArgsOf<UpdateEntity<TStore>>
  ) {
    super('UpdateEntity', args);
  }


  reduce(state: Store.StateOf<TStore>): Store.StateOf<TStore> {
    console.log(`${this.type}: ${JSON.stringify(this.args)}, ${JSON.stringify(state)}`);

    const [id, entity] = this.args;

    return {
      ...state,
      entities: {
        ...state.entities,
        [id]: {
          ...state.entities[id],
          ...entity
        }
      }
    };
  }

}
