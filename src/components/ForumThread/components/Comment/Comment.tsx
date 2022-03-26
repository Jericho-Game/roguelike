import { format } from 'date-fns';

import Avatar from '../../../Avatar';
import normalizeDate from '../../../../utils/normalizeDate';

type CommentProps = Omit<ThreadComment, 'id'>;

export default function Comment(data: CommentProps) {
  const { content, user, date } = data;
  return (
    <div
      className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-2 ml-10"
    >
      <div className="flex gap-3 justify-center mr-2 mb-2 w-full">
        <Avatar
          firstName={user?.first_name ?? ''}
          secondName={user?.second_name ?? ''}
          src={user?.avatar}
          className="flex-shrink-0 h-12 w-12 mr-2"
        />
        <div>
          <h6 className="text-secondary-normal font-semibold text-lg text-center md:text-left whitespace-nowrap">
            {user?.display_name ?? `${user?.first_name} ${user?.second_name}`}
          </h6>
          <span className="text-gray-400">{user?.login}</span>
        </div>
        <span className="ml-auto text-sm text-gray-400">
          {format(normalizeDate(date), 'dd/MMM/yyyy HH:MM')}
        </span>
      </div>
      <p className="text-sm text-center md:text-left ">{content}</p>
    </div>
  );
}
