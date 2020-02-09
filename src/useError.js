import { useContext } from 'react';

import Context from './Context';

export default function useError(name) {
  const { errors } = useContext(Context);
  const error = errors.filter(({ property }) => property === name) || {};
  return error.message || null;
}
