import { Entity, EntityIdProp, EntityIdType, EntityState, GetMetaEntityVal } from './entity-state';
import { Store } from './store';

export class EntityStore<
  TEntityState  extends EntityState<TEntity, TIdProp, TIdType>,
  TEntity       extends Entity<TIdProp, TIdType> = TEntityState extends EntityState<infer T, any, any> ? T : never,
  TIdProp       extends EntityIdProp = GetMetaEntityVal<TEntity, '__ID_PROP__'>,
  TIdType       extends EntityIdType = GetMetaEntityVal<TEntity, '__ID_TYPE__'>
> extends Store<TEntityState> {

  /* @internal */
  readonly __ENTITY__!: TEntity;

  constructor(state: Omit<TEntityState, 'ids' | 'entities'>) {

    super({
      ids: [] as TIdType[],
      entities: {},
      ...state
    } as TEntityState);

  }

}

export namespace EntityStore {

  export function EntityOf<TStore extends EntityStore<any>>() {
    return void 0 as unknown as TStore['__ENTITY__'];
  }

  export type EntityOf<TStore extends EntityStore<any>> = TStore['__ENTITY__'];

}

