import { useState } from 'react';

const useAuthHandler = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAuthAction = async (actionCallback, redirectCallback) => {
    setLoading(true);

    try {
      await actionCallback();
      setSuccess(true);

      setTimeout(() => {
        redirectCallback();
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, handleAuthAction };
};

export default useAuthHandler;
