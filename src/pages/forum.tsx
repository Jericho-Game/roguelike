import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';

import { Tab as UITab } from '@headlessui/react';

import Tab from '../components/Tab';
import ForumCategories from '../components/ForumCategories';
import ForumThread from '../components/ForumThread';

import { ForumState, getThread, getThreads } from '../store/forum';

const categories = ['main', 'questions', 'versions'];

export default function ForumPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();
  const { data = [], current, error } = useSelector((state: { forum: ForumState }) => state.forum);

  useEffect(() => {
    console.log({ error, data });
    if (error) {
      handleError(error);
    }
    if (!data) {
      try {
        dispatch(getThreads());
      } catch (err) {
        handleError(err);
      }
    }
  }, [data, dispatch, error, handleError]);

  useEffect(() => {
    dispatch(getThread(+(id ?? 0)));
  }, [id, dispatch]);

  return (
    <UITab.Group>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h1 className="mb-2">{current?.title ?? 'Forum'}</h1>
      </div>
      {(current) ? (
        <div className="flex space-x-4 px-4 sm:px-6 max-w-7xl mx-auto w-full">
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
        <UITab.List className="flex space-x-4 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          {({ selectedIndex }) => categories.map((category, index) => (
            <Tab
              active={selectedIndex === index}
              as={UITab}
              key={category}
              variant="secondary"
              className="capitalize py-2"
            >
              {category}
            </Tab>
          ))}
        </UITab.List>
      )}
      {(current)
        ? <ForumThread content={current.content} comments={current.comments} />
        : <ForumCategories data={data} categories={categories} />}
    </UITab.Group>
  );
}
