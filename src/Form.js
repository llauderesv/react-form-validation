import React from 'react';
import useForm from './useForm';

function Form() {
  // Define your state schema
  const stateSchema = {
    fname: { value: '', error: '' },
    lname: { value: '', error: '' },
    tags: { value: '', error: '' },
  };

  // Define your validationStateSchema

  // Note: validationStateSchema and stateSchema property
  // should be the same in-order validation works!
  const validationStateSchema = {
    fname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid first name format.',
      },
    },
    lname: {
      required: true,
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

  function onSubmitForm(state) {
    alert(JSON.stringify(state, null, 2));
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
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
          {state.fname.error && <p style={errorStyle}>{state.fname.error}</p>}
        </div>

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
          {state.lname.error && <p style={errorStyle}>{state.lname.error}</p>}
        </div>

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
          {state.tags.error && <p style={errorStyle}>{state.tags.error}</p>}
        </div>

        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
}

export default Form;
