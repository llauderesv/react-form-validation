import React from 'react';
import useForm from '../Hooks/useForm';

import './index.css';

function Form() {
  // Define your state schema
  const stateSchema = {
    first_name: { value: '', error: '' },
    last_name: { value: '', error: '' },
    tags: { value: '', error: '' },
  };

  // Define your validationStateSchema
  // Note: validationStateSchema and stateSchema property
  // should be the same in-order validation works!
  const validationStateSchema = {
    first_name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid first name format.',
      },
    },
    last_name: {
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

  return (
    <form className="my-form" onSubmit={handleOnSubmit}>
      <div className="form-item">
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            value={state.first_name.value}
            onChange={handleOnChange}
          />
        </label>
        {state.first_name.error && (
          <p className="error">{state.first_name.error}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="last_name">
          Last name:
          <input
            type="text"
            name="last_name"
            value={state.last_name.value}
            onChange={handleOnChange}
          />
        </label>
        {state.last_name.error && (
          <p className="error">{state.last_name.error}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="tags">
          Tags:
          <input
            type="text"
            name="tags"
            value={state.tags.value}
            onChange={handleOnChange}
          />
        </label>
        {state.tags.error && <p className="error">{state.tags.error}</p>}
      </div>

      <input type="submit" name="submit" disabled={disable} />
    </form>
  );
}

export default Form;
