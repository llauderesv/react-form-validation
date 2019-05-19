# React form validation

## A simple way to validate forms in react.

### Example usage

### Model your state

```
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
```

### Create a validator

Note: Validator key should be the same in the model that you created above. If it doesn't, it will not recognize the validation.

```
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
```

### Past your state and validator in useForm custom hooks

```
const { state, handleOnChange handleOnSubmit, disable } = useForm(
    validator,
    initialValue,
    onSubmitForm
  );
```

Working demo here: https://codesandbox.io/s/silent-rgb-0t9rq

Give me a star if you like it 😃.
