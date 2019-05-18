import React, { useState, useEffect } from 'react';

function useForm(config, initialValue, callback) {
  const [state, setState] = useState(initialValue);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) setDisable(hasError(state));
  }, [state]);

  function handleOnChange(event) {
    setIsDirty(true);

    const name = event.target.name;
    const value = event.target.value;

    let error = '';
    if (config[name].required) {
      if (!value) {
        error = 'This is required field.';
      }
    }

    if (
      typeof config[name].validator === 'object' &&
      config[name].validator !== null
    ) {
      if (value && !config[name].validator.regEx.test(value)) {
        error = config[name].validator.error;
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

  function hasError(state) {
    return Object.values(state).some(item => item.error);
  }

  return { state, handleOnChange, handleOnSubmit, disable };
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
      required: false,
      validator: {
        regEx: /^(,?\w{2,})+$/,
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

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    validator,
    initialValue,
    onSubmitForm
  );

  function onSubmitForm() {}

  const style = {
    color: 'red',
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <p>
          First name:
          <input
            type="text"
            name="fname"
            value={state.fname.value}
            onChange={handleOnChange}
          />
        </p>
        {state.fname.error && <p style={style}>{state.fname.error}</p>}
        <p>
          Last name:
          <input
            type="text"
            name="lname"
            value={state.lname.value}
            onChange={handleOnChange}
          />
        </p>
        {state.lname.error && <p style={style}>{state.lname.error}</p>}

        <p>
          Tags:
          <input
            type="text"
            name="tags"
            value={state.tags.value}
            onChange={handleOnChange}
          />
        </p>
        {state.tags.error && <p style={style}>{state.tags.error}</p>}

        <input type="submit" name="submit" disabled={disable} />
      </form>
    </>
  );
}

export default Form;
