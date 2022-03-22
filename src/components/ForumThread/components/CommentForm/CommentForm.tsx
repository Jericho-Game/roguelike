import Button from '../../../Button';

export default function CommentForm() {
  return (
    <form acceptCharset="UTF-8" method="post" className="flex flex-wrap">
      <textarea
        id="comment_content"
        className="w-full shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-xl"
        placeholder="Add comment here."
        cols={6}
        rows={3}
        spellCheck="false"
      />
      <Button variant="primary" className="ml-auto">Comment</Button>
    </form>
  );
}
