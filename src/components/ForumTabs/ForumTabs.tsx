import classnames from 'classnames';
import { Tab as UITab } from '@headlessui/react';

import Tab from '../Tab';

type ForumTabsProps = {
  data: Record<string, Thread[]>;
};

export default function ForumTabs({ data }: ForumTabsProps) {
  return (
    <UITab.Group>
      <UITab.List className="flex space-x-4 px-4 sm:px-6 max-w-7xl mx-auto">
        {Object.keys(data).map((category) => (
          <Tab key={category} as={UITab} variant="secondary">{category}</Tab>
        ))}
      </UITab.List>
      <UITab.Panels className="bg-gray-100">
        {Object.entries(data).map(([key, threads]) => (
          <UITab.Panel key={`tab-${key}`} className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul>
              {threads.map((thread) => (
                <li
                  key={thread.id}
                  className="relative p-3 rounded-md hover:bg-coolGray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                    {thread.title}
                  </h3>

                  <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                    <li>{thread.date}</li>
                    <li>&middot;</li>
                    <li>{`${thread.comments.length} comments`}</li>
                  </ul>

                  <a
                    href="/link"
                    className={classnames(
                      'absolute inset-0 rounded-md',
                      'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400',
                    )}
                  >
                    <span className="sr-only">Link</span>
                  </a>
                </li>
              ))}
            </ul>
          </UITab.Panel>
        ))}
      </UITab.Panels>
    </UITab.Group>
  );
}
