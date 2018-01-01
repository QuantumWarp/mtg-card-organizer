import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class Cache {
  private resultCache = new Map<any, any>();

  cacheMethod<T>(cacheKey: any, func: () => Observable<T>, condition: boolean = true): Observable<T> {
    if (!condition) {
      return func();
    }

    if (this.resultCache.has(cacheKey)) {
      return Observable.of(this.resultCache.get(cacheKey));
    }

    const obs = func();
    obs.do(result => {
      this.resultCache.set(cacheKey, result);
    });
  }

  clearCache(cacheKey: any = null) {
    if (!cacheKey) {
      this.resultCache.clear();
      return;
    } else if (this.resultCache.has(cacheKey)) {
      this.resultCache.delete(cacheKey);
    }
  }
}
