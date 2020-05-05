# React useForm Hooks

A simple and declarative way to validate your forms in React.

# Example usage

Create your stateSchema

Your **stateSchema** is an object key value-pair contains the value of an input and the current error if any.

```
const stateSchema = {
  first_name: { value: '', error: '', },
  last_name: { value: '', error: '', },
  tags: { value: '', error: '',  },
};
```

Create validation in your stateSchema

Property should be the same in your stateSchema in-order validation works. **validator** prop accepts a **func** that you can be use to validate your state via regEx.

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

Passed your stateSchema and stateValidatorSchema in useForm hooks. 3rd parameter is (optional) callback function to be called when you submit your form if all fields is valid.

```
const { 
   values, 
   errors, 
   handleOnChange, 
   handleOnSubmit, 
   disable 
 } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);
```

# Demo

Working demo [here](https://codesandbox.io/s/react-form-validation-v7k5z).

# Contributing

Feel free to contribute in this project.

## License

This project is under [MIT License](https://github.com/llauderesv/react-form-validation/blob/master/LICENSE).
