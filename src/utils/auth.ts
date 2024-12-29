// Default credentials for demo purposes
export const DEFAULT_EMAIL = 'login@email.com';
export const DEFAULT_PASSWORD = '1234';

export const validateCredentials = (email: string, password: string): boolean => {
  return email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD;
};

export const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return email === DEFAULT_EMAIL;
};