import { Update } from './actions/update';
import { UpdateEntity } from './actions/update-entity';
import { Entity, EntityState } from './entity-state';
import { EntityStore } from './entity-store';
import { selectEntityByFn, selectEntityById, selectEntityByIds } from './selects/select-entity-by-id';
import { Store } from './store';

interface State {
  xx: string;
}

const store = new Store<State>({ xx: '' });


store.dispatch(new Update({ xx: '3' }));



interface Foo extends Entity<'id', number> {
  id: number;
  title: string
}

interface FooState extends EntityState<Foo> {

}

class FooStore extends EntityStore<FooState> {

}

interface Bar extends Entity<'id', number> {
  id: number;
  title: string
}

interface BarState extends EntityState<Bar> {

}

class BarStore extends EntityStore<BarState> {

}


const fooStore = new FooStore({ });

const barStore = new BarStore({ });


barStore.state$.subscribe(state => console.log('barStore', state));
fooStore.state$.subscribe(state => console.log('fooStore', state));

fooStore.dispatch(new UpdateEntity(1, { id: 1, title: 'XXX'}))


barStore.state$.pipe(selectEntityById(1)).subscribe(entity => console.log('entity', entity));
barStore.state$.pipe(selectEntityByIds([1, 2])).subscribe(entity => console.log('entities', entity));

barStore.state$.pipe(selectEntityByFn(entity => entity.title === 'XXX')).subscribe(entity => console.log('entity', entity));
