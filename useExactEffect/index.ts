import { useEffect } from 'react';
import useCache from '../useCache';

interface EffectDependency {
  old: any;
  new: any;
}

type EffectTrigger = Record<string, EffectDependency>;

export default function useExactEffect(effectHook: (trigger: EffectTrigger) => void, dependencies: Record<string, any>) {
  const previousDeps = useCache(dependencies);
  const effectDependcies: any = [];
  const changedDeps: EffectTrigger = Object.keys(dependencies).reduce((accum, key) => {
    effectDependcies.push(dependencies[key]);
    if (dependencies[key] !== previousDeps[key]) {
      return {
        ...accum,
        [key]: {
          old: previousDeps[key],
          new: dependencies[key],
        },
      };
    } else {
      return accum;
    }
  }, {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => effectHook(changedDeps), effectDependcies);
}