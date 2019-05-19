import React, { useState, useEffect } from 'react';

function useForm(validator, initialValue, callback) {
  const [state, setState] = useState(initialValue);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state]);

  useEffect(() => {
    setDisable(validateState());
  }, []);

  function handleOnChange(event) {
    setIsDirty(true);

    const name = event.target.name;
    const value = event.target.value;

    let error = '';
    if (validator[name].required) {
      if (!value) {
        error = 'This is required field.';
      }
    }

    if (
      typeof validator[name].validator === 'object' &&
      validator[name].validator !== null
    ) {
      if (value && !validator[name].validator.regEx.test(value)) {
        error = validator[name].validator.error;
      }
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    callback();
  }

  function validateState() {
    return Object.keys(validator).some(key => {
      const isRequiredField = validator[key].required;
      const hasValue = state[key].value;

      return (!hasValue && isRequiredField) || state[key].error;
    });
  }

  return { state, disable, handleOnChange, handleOnSubmit };
}

function Form() {
  const validator = {
    fname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid first name format.',
      },
    },
    lname: {
      required: false,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid last name format.',
      },
    },
    tags: {
      required: true,
      validator: {
        regEx: /^(,?\w{3,})+$/,
        error: 'Invalid tag format.',
      },
    },
  };

  const initialValue = {
    fname: {
      value: '',
      error: '',
    },
    lname: {
      value: '',
      error: '',
    },
    tags: {
      value: '',
      error: '',
    },
  };

  function onSubmitForm() {
    alert('Form submitted.');
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    validator,
    initialValue,
    onSubmitForm
  );

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  };

  const formItemStyle = {
    // display: 'inline-block',
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="fname">
            First name:
            <input
              type="text"
              name="fname"
              value={state.fname.value}
              onChange={handleOnChange}
            />
          </label>
        </div>
        {state.fname.error && <p style={errorStyle}>{state.fname.error}</p>}
        <div>
          <label htmlFor="lname">
            Last name:
            <input
              type="text"
              name="lname"
              value={state.lname.value}
              onChange={handleOnChange}
            />
          </label>
        </div>
        {state.lname.error && <p style={errorStyle}>{state.lname.error}</p>}

        <div>
          <label htmlFor="tags">
            Tags:
            <input
              type="text"
              name="tags"
              value={state.tags.value}
              onChange={handleOnChange}
            />
          </label>
        </div>
        {state.tags.error && <p style={errorStyle}>{state.tags.error}</p>}

        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
}

export default Form;
