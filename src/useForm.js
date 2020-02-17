import { useState, useEffect, useCallback } from 'react';
import { get_prop_values, is_object, is_required, VALUE, ERROR } from './utils';

/**
 * useForm hooks to handle your validation in your forms
 *
 * @param {object} stateSchema stateSchema.
 * @param {object} stateValidatorSchema stateSchemaValidation to validate your forms in react.
 * @param {function} submitFormCallback function to be execute during form submission.
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback
) {
  const [state, setStateSchema] = useState(stateSchema);

  const [values, setValues] = useState(get_prop_values(state, VALUE));
  const [errors, setErrors] = useState(get_prop_values(state, ERROR));
  const [dirty, setDirty] = useState(get_prop_values(state, false));

  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Get a local copy of stateSchema
  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true); // Disable button in initial render.
    setInitialErrorState();
  }, []); // eslint-disable-line

  // Set a brand new field values and errors 
  // If stateSchema changes
  useEffect(() => {
    const values = get_prop_values(state, VALUE);
    setValues(values);
    setErrors(
      Object.keys(values).reduce((accu, curr) => {
        accu[curr] = validateField(curr, values[curr]);
        return accu;
      }, {})
    );
  }, [state]); // eslint-disable-line

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]); // eslint-disable-line

  // Set a value of a specific field
  const setFieldValue = ({ name, value }) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
    setDirty(prevState => ({ ...prevState, [name]: true }));
  };

  // Set an error of a specific field
  const setFieldError = ({ name, error }) =>
    setErrors(prevState => ({ ...prevState, [name]: error }));

  // Validate fields in forms
  const validateField = useCallback(
    (name, value) => {
      const validator = stateValidatorSchema;
      // Making sure that stateValidatorSchema name is same in
      // stateSchema
      if (!validator[name]) return;

      const field = validator[name];

      let error = '';
      error = is_required(value, field.required);

      if (is_object(field['validator']) && error === '') {
        const validateFieldByCallback = field['validator'];

        // Test the function callback if the value is meet the criteria
        if (!validateFieldByCallback['func'](value, values)) {
          error = validateFieldByCallback['error'];
        }
      }

      return error;
    },
    [stateValidatorSchema, values]
  );

  // Set Initial Error State
  // When hooks was first rendered...
  const setInitialErrorState = useCallback(() => {
    Object.keys(errors).map(name =>
      setFieldError({ name, error: validateField(name, values[name]) })
    );
  }, [errors, values, validateField]);

  // Used to disable submit button if there's a value in errors
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateErrorState = useCallback(
    () => Object.values(errors).some(error => error),
    [errors]
  );

  // Use this callback function to safely submit the form
  // without any errors in state...
  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();

      // Making sure that there's no error in the state
      // before calling the submit callback function
      if (!validateErrorState()) {
        submitFormCallback(values);
      }
    },
    [validateErrorState, submitFormCallback, values]
  );

  // Event handler for handling changes in input.
  const handleOnChange = useCallback(
    event => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      const error = validateField(name, value);

      setFieldValue({ name, value });
      setFieldError({ name, error });
    },
    [validateField]
  );

  return {
    dirty,
    values,
    errors,
    disable,
    setStateSchema,
    setFieldValue,
    setFieldError,
    handleOnChange,
    handleOnSubmit,
    validateErrorState,
  };
}

export default useForm;
