import Comment from './components/Comment';
import CommentForm from './components/CommentForm';

type ForumThreadProps = {
  content: Thread['content'];
  comments: Thread['comments'];
};

export default function ForumThread({ content, comments }: ForumThreadProps) {
  return (
    <div className="bg-gray-100 h-full">
      <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6">
        <section className="bg-white px-8 py-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mb-4">
          {content}
        </section>
        <section className="mb-5">
          {comments.map(({
            id,
            user,
            content: commentContent,
            date,
          }) => (
            <Comment
              key={id}
              user={user}
              content={commentContent}
              date={date}
            />
          ))}
        </section>
        <CommentForm />
      </div>
    </div>
  );
}
