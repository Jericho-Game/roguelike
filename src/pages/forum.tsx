import { useState } from 'react';

import ForumTabs from '../components/ForumTabs';

export default function ForumPage() {
  const [categories] = useState();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="mb-2">Forum</h1>
      </div>
      <ForumTabs data={categories} />
    </>
  );
}
