import type { PropsWithChildren } from 'react';
import classnames from 'classnames';

import Header from '../Header';

export default function Layout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <>
      <Header />
      <main className={classnames('mx-auto h-full w-full grow-q', className)}>
        {children}
      </main>
    </>
  );
}
