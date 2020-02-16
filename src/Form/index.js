import React, { useEffect } from 'react';
import useForm from '../useForm';
import './index.css';

function Form() {
  // Define your state schema
  const stateSchema = {
    first_name: { value: 'Vincent', error: '' },
    last_name: { value: '', error: '' },
    tags: { value: '', error: '' },
  };

  const delay = () => new Promise(resolve => setTimeout(resolve, 5000));

  // Create your own validationStateSchema
  // stateSchema property should be the same in validationStateSchema
  // in-order a validation to works in your input.
  const stateValidatorSchema = {
    first_name: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z]+$/.test(value),
        error: 'Invalid first name format.',
      },
    },
    last_name: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z]+$/.test(value),
        error: 'Invalid last name format.',
      },
    },
    tags: {
      required: true,
      validator: {
        func: value => /^(,?\w{3,})+$/.test(value),
        error: 'Invalid tag format.',
      },
    },
  };

  function onSubmitForm(state) {
    alert(JSON.stringify(state, null, 2));
  }

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    setFieldError,
    setFieldValue,
    setStateSchema,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  useEffect(() => {
    delay().then(() => {
      setStateSchema({
        first_name: { value: 'Denise', error: '' },
        last_name: { value: '', error: '' },
        tags: { value: '', error: '' },
      });
      // setFieldValue({ name: 'first_name', value: 'Hello' });
      // setFieldError({ name: 'first_name', error: 'Vince' });
    });
  }, []);

  const { first_name, last_name, tags } = values;

  return (
    <form className="my-form" onSubmit={handleOnSubmit}>
      <div className="form-item">
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleOnChange}
          />
        </label>
        {errors.first_name && <p className="error">{errors.first_name}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="last_name">
          Last name:
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleOnChange}
          />
        </label>
        {errors.last_name && dirty.last_name && (
          <p className="error">{errors.last_name}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="tags">
          Tags:
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleOnChange}
          />
        </label>
        {errors.tags && dirty.tags && <p className="error">{errors.tags}</p>}
      </div>

      <input type="submit" name="submit" disabled={disable} />
    </form>
  );
}

export default Form;
