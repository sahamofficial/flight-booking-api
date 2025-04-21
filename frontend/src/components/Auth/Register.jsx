import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      await registerUser(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            className="form-input"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            id="phone"
            type="tel"
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+\-\s()]{8,20}$/,
                message: 'Please enter a valid phone number'
              }
            })}
            className="form-input"
          />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        
        <div>
          <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
          <input
            id="password_confirmation"
            type="password"
            {...register('password_confirmation', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'The passwords do not match'
            })}
            className="form-input"
          />
          {errors.password_confirmation && <p className="form-error">{errors.password_confirmation.message}</p>}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
