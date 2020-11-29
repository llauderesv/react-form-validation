import React from 'react';

interface StateSchemaProp {
  value: string | number;
  error: string;
}

interface Validator {
  func(param: any): boolean;
  error: string;
}

interface ValidatorSchema<T> {
  required?: boolean;
  validator?: Validator;
  compare?: { to: keyof T; error: string };
}

type ReturnValue<T> = {
  values: { [P in keyof T]: any };
  errors: { [P in keyof T]: any };
  dirty: { [P in keyof T]: any };
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void;
  disable: boolean;
};

export type StateSchema<T> = {
  [P in keyof T]: StateSchemaProp;
};

export type StateValidatorSchema<T> = {
  [P in keyof T]: ValidatorSchema<T>;
};

export default function useForm<T>(
  stateSchema: StateSchema<T>,
  stateValidatorSchema: StateValidatorSchema<T>,
  onSubmitForm?: () => void
): ReturnValue<T>;
