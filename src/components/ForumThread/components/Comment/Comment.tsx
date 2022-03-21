import Avatar from '../../../Avatar';
import useDataFetch from '../../../../hooks/useDataFetch';

export default function Comment(data: ThreadComment) {
  const { content } = data;
  const { data: user } = useDataFetch<User>('/user/142809');
  return (
    <div className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-2">
      <div className="flex flex-row justify-center mr-2">
        <Avatar
          firstName={user?.first_name ?? ''}
          secondName={user?.second_name ?? ''}
          src={user?.avatar}
        />
        <h3 className="text-secondary-normal font-semibold text-lg text-center md:text-left ">{user?.display_name}</h3>
      </div>
      <p className="text-gray-600 text-lg text-center md:text-left ">{content}</p>
    </div>
  );
}
