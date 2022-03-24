import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Tab as UITab } from '@headlessui/react';

import normalizeDate from '../../utils/normalizeDate';

type ForumTabsProps = {
  data: Nullable<Thread[]>;
  categories: string[];
};

export default function ForumCategories({ data, categories }: ForumTabsProps) {
  return (
    <UITab.Panels className="bg-gray-100">
      {categories.map((key) => (
        <UITab.Panel key={`tab-${key}`} className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul>
            {data?.filter(({ category }) => category === key).map((thread) => (
              <li key={thread.id} className="relative py-3 rounded-md hover:bg-coolGray-100">
                <Link to={`/forum/${thread.id}`} className="text-left" type="button">
                  <h3 className="text-sm font-medium leading-5">{thread.title}</h3>
                  <dl className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                    <dt>{format(normalizeDate(thread.date), 'dd/MMM/yyyy')}</dt>
                    <dt>&middot;</dt>
                    <dt>{`${thread.comments.length} comments`}</dt>
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </UITab.Panel>
      ))}
    </UITab.Panels>
  );
}
