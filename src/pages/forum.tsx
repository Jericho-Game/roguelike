import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Tab as UITab } from '@headlessui/react';

import ForumTabs from '../components/ForumTabs';
import Tab from '../components/Tab';
import ForumThread from '../components/ForumThread';

import { ForumState, getThread, getThreads } from '../store/forum';

const categories = ['main', 'questions', 'versions'];

export default function ForumPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, current } = useSelector((state: { forum: ForumState }) => state.forum);

  useEffect(() => {
    if (!data) {
      dispatch(getThreads());
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(getThread(+(id ?? 0)));
  }, [id, dispatch]);

  return (
    <UITab.Group>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="mb-2">{current?.title ?? 'Forum'}</h1>
      </div>
      {(current) ? (
        <div className="flex space-x-4 px-4 sm:px-6 max-w-7xl mx-auto">
          <Tab
            as={Link}
            to="/forum"
            variant="secondary"
            className="capitalize"
            onClick={() => dispatch(getThread(null))}
          >
            Back
          </Tab>
        </div>
      ) : (
        <UITab.List className="flex space-x-4 px-4 sm:px-6 max-w-7xl mx-auto">
          {({ selectedIndex }) => categories.map((category, index) => (
            <Tab
              active={selectedIndex === index}
              as={UITab}
              key={category}
              variant="secondary"
              className="capitalize"
            >
              {category}
            </Tab>
          ))}
        </UITab.List>
      )}
      {(current)
        ? <ForumThread {...current} />
        : <ForumTabs data={data ?? []} categories={categories} />}
    </UITab.Group>
  );
}
