import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../../utils/auth';

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export default function ForgotPasswordForm({ onCancel }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const success = await sendPasswordResetEmail(email);
      setStatus(success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-green-600 mb-2">Reset Email Sent!</h3>
        <p className="text-gray-600 mb-4">Please check your email for reset instructions.</p>
        <button
          onClick={onCancel}
          className="text-purple-600 hover:text-purple-700"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="reset-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          We couldn't find an account with that email address.
        </p>
      )}

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );
}