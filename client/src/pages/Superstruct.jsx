import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import { assert, object, string, refine, nonempty, number } from 'superstruct';

import { useState } from 'react';
// Non-empty string validator
const nonEmptyString = (fieldName) =>
  refine(
    string(),
    fieldName,
    (value) => value.trim() !== '' || `${fieldName} is required.`
  );

// Custom email validator with error message
const emailValidator = refine(nonEmptyString('Email'), 'email', (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    emailRegex.test(value) ||
    'Invalid email format. Please enter a valid email address.'
  );
});

// Custom phone validator
const phoneValidator = refine(number(), 'phone', (value) => {
  return (
    String(value).length >= 10 || 'Phone number must be at least 10 digits.'
  );
});

// Custom password validator
const passwordValidator = refine(
  nonEmptyString('Password'),
  'password',
  (value) => {
    return value.length >= 6 || 'Password must be at least 6 characters long.';
  }
);

const FormSchema = object({
  name: nonEmptyString('Name'),
  email: emailValidator,
  phone: refine(number(), 'phone', (value) => {
    return value
      ? String(value).length >= 10 || 'Phone number must be at least 10 digits.'
      : 'Phone number is required.';
  }),
  password: passwordValidator,
});

export async function formAction({ request }) {
  const formData = Object.fromEntries(await request.formData());
  formData.phone = Number(formData.phone); // Ensure phone is treated as a number
  console.log(formData);

  try {
    assert(formData, FormSchema);
    return console.log('awesome');
  } catch (error) {
    const errors = {};
    error.failures().forEach((failure) => {
      errors[failure.path[0]] = failure.message;
    });
    return { errors };
  }
}
const Superstruct = () => {
  const data = useActionData();
  const { errors } = data || {};

  return (
    <section className='superstruct-page dead-center-page'>
      <Form className='superstruct-form' method='post'>
        <div className='title'>
          <h2 className='w-xs'>Form</h2>
          <h5 className='form-subtitle'>validated with superstruct</h5>
        </div>
        <div className='form-row'>
          <label htmlFor='name'>name</label>
          <input className='input ' type='text' name='name' id='name' />
          {errors?.name && <small className='error-msg'>{errors?.name}</small>}
        </div>
        <div className='form-row'>
          <label htmlFor='email'>email</label>
          <input className='input' name='email' type='email' id='email' />
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
          />{' '}
          {errors?.password && (
            <small className='error-msg'>{errors?.password}</small>
          )}
        </div>
        <div className='form-row'>
          <label htmlFor='phone'>phone no</label>
          <input className='input' id='phone' name='phone' type='number' />{' '}
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
