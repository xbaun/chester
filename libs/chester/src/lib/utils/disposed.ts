import { Subject } from 'rxjs';

export function disposed() {
  return {
    value$: new Subject<void>(),
    value: false,
    true() {
      this.value = true;
      this.value$.next();
      this.value$.complete();
    }
  }
}
