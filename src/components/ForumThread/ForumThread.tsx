import Comment from './components/Comment';

export default function ForumThread(data?: Thread) {
  if (!data) return <span />;
  const {
    content,
    comments,
  } = data;
  return (
    <div className="bg-gray-100 h-full">
      <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6">
        <section className="bg-white p-8 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mb-4">
          {content}
        </section>
        <section>
          {comments.map((comment) => <Comment key={comment.id} {...comment} />)}
        </section>
      </div>
    </div>
  );
}
