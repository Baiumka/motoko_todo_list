// src/hooks/useErrorModal.js
import { useState } from 'react';
import ErrorModal from '../components/ErrorDialog';

const useErrorModal = () => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    const rejectMessageMatch = message.match(/Reject message":\s?"([^"]+)"/);
    const rejectMessage = rejectMessageMatch ? rejectMessageMatch[1] : message;
    setError(rejectMessage);
  };

  const ErrorComponent = error ? (
    <ErrorModal errorMessage={error} onClose={() => setError(null)} />
  ) : null;

  return [showError, ErrorComponent];
};

export default useErrorModal;
