import classnames from 'classnames';
import Spinner from './Spinner';

export default function FullScreenSpinner() {
  return (
    <div
      className={classnames(
        'fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center',
      )}
    >
      <Spinner />
    </div>
  );
}
