// import { useRouter } from 'next/router';
// import { useCallback, useMemo } from 'react';
// import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import { formatDistanceToNowStrict } from 'date-fns';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// import useLoginModal from '@/hooks/useLoginModal';
// import useCurrentUser from '@/hooks/useCurrentUser';
// import useLike from '@/hooks/useLike';
// import FormEdit from '@/components/FormEdit';

// import Avatar from '../Avatar';
// interface PostItemProps {
//   data: Record<string, any>;
//   userId?: string;
// }

// interface ColorfulTextProps {
//   text: string;
// }

// const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
//   const router = useRouter();
//   const loginModal = useLoginModal();

//   const { data: currentUser } = useCurrentUser();
//   const { hasLiked, toggleLike } = useLike({ postId: data.id, userId});

//   const goToUser = useCallback((ev: any) => {
//     ev.stopPropagation();
//     router.push(`/users/${data.user.id}`)
//   }, [router, data.user.id]);

//   const goToPost = useCallback(() => {
//     router.push(`/posts/${data.id}`);
//   }, [router, data.id]);

//   const onLike = useCallback(async (ev: any) => {
//     ev.stopPropagation();

//     if (!currentUser) {
//       return loginModal.onOpen();
//     }

//     toggleLike();
//   }, [loginModal, currentUser, toggleLike]);

//   const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

//   const createdAt = useMemo(() => {
//     if (!data?.createdAt) {
//       return null;
//     }

//     return formatDistanceToNowStrict(new Date(data.createdAt));
//   }, [data.createdAt])

//   const ColorfulText: React.FC<ColorfulTextProps> = ({ text }) => {
//   // Use regular expression to find words starting with '#'
//   const regex = /#\w+/g;
//   const coloredText = text.replace(regex, (match) => `<span style="color: #1DA1F2">${match}</span>`);

//   return <div dangerouslySetInnerHTML={{ __html: coloredText }} />;
// };

// const deletePost = useCallback(async () => {
//   try {
//     await axios.delete(`/api/posts?postId=${data.id}`);
//     toast.success('Post deleted');

//     // redirect to home
//     router.push('/');
//     // mutatePosts();
//   } catch (error) {
//     console.log(error);
//     toast.error('Something went wrong');
//   }
// }, [data.id]);

// // const editPost = useCallback(async (body:string) => {
// //   try {
// //     await axios.put(`/api/posts?postId=${data.id}`, { body });
// //     toast.success('Post edited');

// //     // redirect to home
// //     router.push('/');
// //     // mutatePosts();
// //   } catch (error) {
// //     console.log(error);
// //     toast.error('Something went wrong');
// //   }
// // }, [data.id]);

//   return (
//     <div
//       onClick={goToPost}
//       className="
//         border-b-[1px]
//         border-neutral-800
//         p-5
//         cursor-pointer
//         hover:bg-neutral-900
//         transition
//       ">
//       <div className="flex flex-row items-start gap-3">
//         <Avatar userId={data.user.id} />
//         <div>
//           <div className="flex flex-row items-center gap-2">
//             <p
//               onClick={goToUser}
//               className="
//                 text-white
//                 font-semibold
//                 cursor-pointer
//                 hover:underline
//             ">
//               {data.user.name}
//             </p>
//             <span
//               onClick={goToUser}
//               className="
//                 text-neutral-500
//                 cursor-pointer
//                 hover:underline
//                 hidden
//                 md:block
//             ">
//               @{data.user.username}
//             </span>
//             <span className="text-neutral-500 text-sm">
//               {createdAt}
//             </span>
//           </div>
//           <div className="text-white mt-1">
//             <ColorfulText text={data.body} />
//           </div>
//           <div className="flex flex-row items-center mt-3 gap-10">
//             <div
//               className="
//                 flex
//                 flex-row
//                 items-center
//                 text-neutral-500
//                 gap-2
//                 cursor-pointer
//                 transition
//                 hover:text-sky-500
//             ">
//               <AiOutlineMessage size={20} />
//               <p>
//                 {data.comments?.length || 0}
//               </p>
//             </div>
//             <div
//               onClick={onLike}
//               className="
//                 flex
//                 flex-row
//                 items-center
//                 text-neutral-500
//                 gap-2
//                 cursor-pointer
//                 transition
//                 hover:text-red-500
//             ">
//               <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
//               <p>
//                 {data.likedIds.length}
//               </p>
//             </div>
//             {currentUser?.id === data.user.id && (
//               <div
//               onClick={deletePost}
//               className="
//                 flex
//                 flex-row
//                 items-center
//                 text-neutral-500
//                 gap-2
//                 cursor-pointer
//                 transition
//                 hover:text-red-500
//             ">
//               <AiOutlineDelete size={20} />
//             </div>

//             )}
//             {currentUser?.id === data.user.id && (
//               <div
//               onClick={deletePost}
//               className="
//                 flex
//                 flex-row
//                 items-center
//                 text-neutral-500
//                 gap-2
//                 cursor-pointer
//                 transition
//                 hover:text-green-500
//             ">
//               <AiOutlineEdit size={20} />
//             </div>

//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostItem;

import { useState } from "react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import FormEdit from "@/components/FormEdit";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

interface ColorfulTextProps {
  text: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const ColorfulText: React.FC<ColorfulTextProps> = ({ text }) => {
    // Use regular expression to find words starting with '#'
    const regex = /#\w+/g;
    const coloredText = text.replace(
      regex,
      (match) => `<span style="color: #1DA1F2">${match}</span>`
    );

    return <div dangerouslySetInnerHTML={{ __html: coloredText }} />;
  };

  const deletePost = useCallback(async () => {
    try {
      await axios.delete(`/api/posts?postId=${data.id}`);
      toast.success("Post deleted");

      // redirect to home
      router.push("/");
      // mutatePosts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [data.id]);

  const [isFormEditOpen, setIsFormEditOpen] = useState(false);

  const openFormEdit = () => {
    setIsFormEditOpen(true);
  };

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white
                font-semibold
                cursor-pointer
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">
            <ColorfulText text={data.body} />

            {data.image && (
              <div>
                <img
                  src={data.image}
                  className="
              w-full
              h-96
              object-cover
              rounded-md
              cursor-pointer
              hover:opacity-80
              transition
            "
                />
              </div>
            )}
            <hr
              className="
              my-2
              border-neutral-700"
            />
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500
            "
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
            {currentUser?.id === data.user.id && (
              <div
                onClick={deletePost}
                className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500
            "
              >
                <AiOutlineDelete size={20} />
              </div>
            )}
            {currentUser?.id === data.user.id && (
              <div
                onClick={openFormEdit} // Call the openFormEdit function when AiOutlineEdit is clicked
                className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-green-500
            "
              >
                <AiOutlineEdit size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Render FormEdit only if isFormEditOpen is true */}
      {isFormEditOpen && <FormEdit oldBody={data.body} postId={data.id} />}
    </div>
  );
};

export default PostItem;
