import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import type { PropsWithChildren } from 'react';
import Button from '../Button';

import errorPic from './assets/error.gif';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="bg-gray-100 grow h-full w-full flex items-center">
      <div role="alert" className="m-auto content-center bg-white py-8 px-12 rounded-3xl">
        <h2 className="mb-6">OH NO! Error Page!</h2>
        <a href="https://dribbble.com/imargarita">
          <span className="sr-only">Error</span>
          <img src={errorPic} alt="Error" />
        </a>
        <div className="w-full flex justify-between">
          <pre className="my-4">{error.message}</pre>
          <Button variant="secondary" onClick={resetErrorBoundary}>Reload app</Button>
        </div>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({
  children,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      onReset={() => {}}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
