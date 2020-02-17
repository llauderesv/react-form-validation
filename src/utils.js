export const VALUE = 'value';
export const ERROR = 'error';
export const REQUIRED_FIELD_ERROR = 'This is required field';

function is_bool(value) {
  return typeof value === 'boolean';
}

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
export function is_object(value) {
  return typeof value === 'object' && value !== null;
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
export function is_required(value, isRequired) {
  if (!value && isRequired) return REQUIRED_FIELD_ERROR;
  return '';
}

export function get_prop_values(stateSchema, prop) {
  return Object.keys(stateSchema).reduce((field, key) => {
    field[key] = is_bool(prop) ? prop : stateSchema[key][prop];

    return field;
  }, {});
}
