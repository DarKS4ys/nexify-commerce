import type {
  Comment as PrismaComment, User
} from '@prisma/client';
import AddCommentButton from './AddCommentButton';

interface Comment extends PrismaComment {
  user: User;
}

interface CommentsProps {
  comments: Comment[];
  sendComment: any
  productId: string
  user: User
}

export default function Comments({ user, productId, comments, sendComment }: CommentsProps) {
  console.log(comments);

  return (
    <div className="flex flex-col w-full gap-2">
      <AddCommentButton user={user} sendComment={sendComment} productId={productId}/>
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-2">
          <div className='flex gap-2'>
            <p>{comment.user?.name}</p>
            <p>Created at: {comment.createdAt.toLocaleString()}</p>
          </div>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
