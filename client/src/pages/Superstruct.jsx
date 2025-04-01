import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import {
  assert,
  object,
  string,
  nonempty,
  StructError,
  number,
} from 'superstruct';

const emailRegex = '^[w-.]+@([w-]+.)+[w-]{2,4}$';

const articleSchema = object({
  name: nonempty(string()),
  email: nonempty(string()),
  password: nonempty(string()),
  phone: nonempty(number()),
});

export const formAction = async ({ request }) => {
  const form = await request.formData();

  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }
  formToJSON.phone = parseFloat(formToJSON.phone);
  console.log(formToJSON);

  try {
    assert(formToJSON, articleSchema);
    return redirect('/');
  } catch (e) {
    console.log(e);
    let errors = {};
    const { key, value, type, name } = e;
    if (type === 'email') {
      const error = new Error(`email prst`);
      error.attribute = key;
      errors[error.attribute] = error.message;
    }

    if (value === undefined) {
      const error = new Error(`user_${key}_required`);
      error.attribute = key;
      errors[error.attribute] = error.message;
    }

    if (type === 'never') {
      const error = new Error(`camp inexistent`);
      error.attribute = key;
      errors[error.attribute] = error.message;
    }

    const error = new Error(`format invalid`);
    error.attribute = key;
    error.value = value;
    errors[error.attribute] = error.message;

    return errors;
  }
};
const Superstruct = () => {
  const errors = useActionData();
  console.log('errors', errors);

  return (
    <section className='superstruct-page dead-center-page'>
      <Form className='superstruct-form' method='post'>
        <div className='title'>
          <h2 className='w-xs'>Form</h2>
        </div>
        <div className='form-row'>
          <label htmlFor='name'>name</label>
          <input
            className='input '
            type='text'
            name='name'
            id='name'
            required
          />
          {errors?.name && <small className='error-msg'>{errors?.name}</small>}
        </div>
        <div className='form-row'>
          <label htmlFor='email'>email</label>
          <input
            className='input'
            name='email'
            type='email'
            id='email'
            required
          />
          {errors?.email && (
            <small className='error-msg'>{errors?.email}</small>
          )}
        </div>
        <div className='form-row'>
          <label htmlFor='password'>password</label>
          <input
            id='password'
            className='input'
            name='password'
            type='password'
            required
          />{' '}
          {errors?.password && (
            <small className='error-msg'>{errors?.password}</small>
          )}
        </div>
        <div className='form-row'>
          <label htmlFor='phone'>phone no</label>
          <input
            className='input'
            id='phone'
            name='phone'
            type='number'
            required
          />{' '}
          {errors?.phone && (
            <small className='error-msg'>{errors?.phone}</small>
          )}
        </div>
        <div className='btn-row'>
          <button className='btn form-btn'>Submit</button>
        </div>
      </Form>
    </section>
  );
};

export default Superstruct;
