# useForm Hooks

## A simple and easiest way to validate your forms in React.

## Example usage

#### Model your stateSchema

Your **stateSchema** an object key value-pair contains the value of an input and the current error if any.

```
const stateSchema = {
  first_name: { value: '', error: '', },
  last_name: { value: '', error: '', },
  tags: { value: '', error: '',  },
};
```

#### Create a validation your stateSchema

**stateValidatorSchema** property should be the same in your stateSchema in-order validation works. **validator** prop is an object that accepts a **func** value to create your own validation rules. It returns boolean to indicate your validation if passed or failed.

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

# Demo

Working demo here: https://codesandbox.io/s/react-form-validation-v7k5z

# Contributions

Feel free to contribute in this project.

# License

This project is under [MIT License](https://github.com/llauderesv/react-form-validation/blob/master/LICENSE).
