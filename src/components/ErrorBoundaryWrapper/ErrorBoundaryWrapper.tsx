import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import type { PropsWithChildren } from 'react';
import Button from '../Button';

type ErrorBoundaryWrapperProps = PropsWithChildren<{
  onReset?: () => void;
}>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 w-full">
        <h1>Leaderboard</h1>
      </div>
      <div role="alert" className="m-auto w-auto">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <Button variant="secondary" onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </>
  );
}

export default function ErrorBoundaryWrapper({ onReset, children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      onReset={onReset}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
