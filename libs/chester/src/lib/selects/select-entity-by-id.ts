import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityState, GetMetaEntityVal } from '../entity-state';

export function selectEntityById<T extends EntityState<any>>(id: GetMetaEntityVal<T, '__ID_TYPE__'>) {
  return (source: Observable<T>) => source.pipe(map(state => state.entities[id] as T['entities'][any] | undefined));
}

export function selectEntityByIds<T extends EntityState<any>>(ids: GetMetaEntityVal<T, '__ID_TYPE__'>[]) {
  return (source: Observable<T>) => source.pipe(map(state => ids.map(id => state.entities[id] as T['entities'][any] | undefined)));
}

export function selectEntityByFn<T extends EntityState<any>>(predicate: (entity: T['entities'][any]) => boolean) {
  return (source: Observable<T>) => source.pipe(map(state =>
    state.ids
      .filter(id => predicate(state.entities[id]))
      .map(id => state.entities[id] as T['entities'][any])
  ));
}
