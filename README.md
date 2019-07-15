## A simple way to validate your forms in React.

### Example usage

### Create your stateSchema

```
const stateSchema = {
  first_name: {
    value: '',
    error: '',
  },
  last_name: {
    value: '',
    error: '',
  },
  tags: {
    value: '',
    error: '',
  },
};
```

### Create a validationSchema

Note: Validation Schema key should be the same in the State Schema key that you created. If it doesn't, it will not recognize your validation.

```
const validator = {
  first_name: {
    required: true,
     validator: {
      regEx: /^[a-zA-Z]+$/,
      error: 'Invalid first name format.',
    },
  },
  last_name: {
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

### This will not work:

```
// Define StateSchema
const stateSchema = {
  first_name: {
    value: '',
    error: '',
  }
}

// Define ValidationScheme
const validationSchema = {
  fname: { // Fail!, because it doesn't match the key in stateSchema.
    required: true
  }
}

```

### Passed your stateSchema and validationSchema in useForm hooks.

```
const { state, handleOnChange handleOnSubmit, disable } =
   useForm(
    stateSchema,
    validationSchema,
    onSubmitForm // Optional
  );
```

Working demo here: https://codesandbox.io/s/silent-rgb-0t9rq
