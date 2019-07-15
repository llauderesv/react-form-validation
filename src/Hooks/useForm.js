import { useState, useEffect, useCallback } from 'react';

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * Returns true if the value is RegExp.
 *
 * @param {RegExp} value
 */
function isRegExp(value) {
  return value instanceof RegExp;
}

/**
 * Custom hooks to validate your Form...
 * 
 * @param {object} stateSchema model you stateSchema.
 * @param {object} validationSchema model your validation.
 * @param {function} callback function to be execute during form submission.
 */
function useForm(stateSchema = {}, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true);
  }, []);

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
    // eslint-disable-next-line
  }, [state, isDirty]);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationSchema]);

  // Event handler for handling changes in input.
  // eslint-disable-next-line
  const handleOnChange = useCallback(event => {
    setIsDirty(true);

    const name = event.target.name;
    const value = event.target.value;

    let error = '';
    if (validationSchema[name].required) {
      if (!value) {
        error = 'This is required field.';
      }
    }

    if (isObject(validationSchema[name].validator)) {
      if (!isRegExp(validationSchema[name].validator.regEx)) {
        throw new Error("Your RegExp value isn't a valid RegExp Object");
      }

      // Test your defined RegExp...
      if (value && !validationSchema[name].validator.regEx.test(value)) {
        error = validationSchema[name].validator.error;
      }
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  });

  // eslint-disable-next-line
  const handleOnSubmit = useCallback(event => {
    event.preventDefault();

    // Making sure that there's no error in the state
    // before calling the submit callback function
    if (!validateState()) {
      callback(state);
    }
  });

  return { handleOnChange, handleOnSubmit, state, disable };
}

export default useForm;
