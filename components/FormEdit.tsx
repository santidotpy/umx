import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';

interface FormProps {
  isComment?: boolean;
  postId?: string;
    oldBody?: string;
}

const Form: React.FC<FormProps> = ({ isComment, postId, oldBody }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // set the old body to the current body
    if (body === '' && oldBody !== undefined) {
        setBody(oldBody);
    }

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts?postId=${postId}`;

      await axios.put(url, { body });

      setBody('');
      mutatePosts();
      mutatePost();
      // reload the page
        window.location.reload();
      toast.success('Post edited');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              >
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Edit" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to UMX</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
