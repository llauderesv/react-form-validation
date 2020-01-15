# useForm Hooks

## A simple way to validate your forms in React.

### Example usage

#### Model your stateSchema

Your **stateSchema** an object key value-pair contains the value of an input and the current error if any.

```
const stateSchema = {
  first_name: { value: '', error: '', },
  last_name: { value: '', error: '', },
  tags: { value: '', error: '',  },
};
```

#### Create a validation in your stateSchema

**stateValidatorSchema** property should be the same in your stateSchema in-order the validation works. **validator** prop is an object that accepts a **func** value to create your own validation rules. If returns true it will show your error property else it doesn't.

```
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
```

### Passed your stateSchema and stateValidatorSchema in useForm hooks. The 3rd parameter is (optional) a callback function to be called if all inputs is valid.

```
const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
  stateSchema,
  stateValidatorSchema,
  onSubmitForm
);
```

### Validation doesn't work in the example below:

```
// Create StateSchema
const stateSchema = {
  first_name: { value: '', error: '', }
}

// Create StateValidatorSchema
const stateValidatorSchema = {
  // Fail!, because it doesn't match the key in stateSchema.
  fname: { required: true }
}
```

Working demo here: https://codesandbox.io/s/react-form-validation-v7k5z
