export const ARCID_ERROR_ADD = 'ARCID_ERROR_ADD';
export const ARCID_ERROR_CLEAR = 'ARCID_ERROR_CLEAR';


export function add(error) {
  return {
    type: ARCID_ERROR_ADD,
    error: error
  };
}

export function clear() {
  return {
    type: ARCID_ERROR_CLEAR
  };
}