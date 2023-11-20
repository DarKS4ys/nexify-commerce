'use client';

import { Toaster, toast } from 'sonner';
import { useState, useTransition } from 'react';
import { IoMdSend } from 'react-icons/io';
import type { User } from '@prisma/client';

interface AddCommentButton {
  productId: string;
  sendComment: (productId: string, text: string, user: User) => Promise<void>;
  user: User
}

export default function AddCommentButton({ user, productId, sendComment }: AddCommentButton) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="flex items-center gap-2 w-full">
      <Toaster theme="light" richColors closeButton />
      <input
        required
        name="Comment"
        placeholder="Comment"
        className="input input-bordered w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-primary uppercase group overflow-hidden"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            try {
              await sendComment(productId, text, user);
              setSuccess(true);
              toast.success('Comment added.');
            } catch (error) {
              toast.error("Couldn't send the comment.");
            }
          });
        }}
      >
        <h1 className='group-hover:translate-x-3 transition duration-200'>Send</h1>
        <IoMdSend size={18} className="group-hover:translate-x-9 transition duration-200" />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Comment added.</span>
      )}
    </div>
  );
}