import React from 'react';
import useForm from 'lib';
import './index.css';

function Form() {
  // Define your state schema
  const stateSchema = {
    first_name: { value: 'Vincent', error: '' },
    last_name: { value: '', error: '' },
    tags: { value: '', error: '' },
    password: { value: '', error: '' },
    confirm_password: { value: '', error: '' },
  };

  const onSubmitForm = (state) => {
    alert(JSON.stringify(state, null, 2));
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(
    stateSchema,
    {
      first_name: {
        required: true,
        validator: {
          func: (value) => /^[a-zA-Z]+$/.test(value),
          error: 'Invalid first name format.',
        },
      },
      last_name: {
        required: true,
        validator: {
          func: (value) => /^[a-zA-Z]+$/.test(value),
          error: 'Invalid last name format.',
        },
      },
      tags: {
        validator: {
          func: (value) => /^(,?\w{3,})+$/.test(value),
          error: 'Invalid tag format.',
        },
      },
      confirm_password: {
        required: true,
        validator: {
          func: (value, values) => value === values.password,
          error: 'Confirm Password does not match to Password',
        },
      },
      password: {
        required: true,
        compare: {
          to: 'confirm_password',
          error: 'Password does not match to confirm password',
        },
        validator: {
          func: (value) => /^[a-zA-Z]+$/.test(value),
          error: 'Password does not meet the requirement',
        },
      },
    },
    onSubmitForm
  );

  const { first_name, last_name, tags, password, confirm_password } = values;

  return (
    <form className="my-form" onSubmit={handleOnSubmit}>
      <div className="form-item">
        <label htmlFor="first_name">First name:</label>
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleOnChange}
        />
        {errors.first_name && dirty.first_name && (
          <p className="error">{errors.first_name}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleOnChange}
        />
        {errors.last_name && dirty.last_name && (
          <p className="error">{errors.last_name}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="tags">Tags:</label>
        <input type="text" name="tags" value={tags} onChange={handleOnChange} />
        {errors.tags && dirty.tags && <p className="error">{errors.tags}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleOnChange}
        />
        {errors.password && dirty.password && (
          <p className="error">{errors.password}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="text"
          name="confirm_password"
          value={confirm_password}
          onChange={handleOnChange}
        />
        {errors.confirm_password && dirty.confirm_password && (
          <p className="error">{errors.confirm_password}</p>
        )}
      </div>

      <input type="submit" name="submit" disabled={disable} />
    </form>
  );
}

export default Form;
