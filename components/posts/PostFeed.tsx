import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {!currentUser ? (
        <div className="flex flex-col items-center text-white mt-5">
          <h2 className="text-2xl font-bold text-white-500">Welcome to UMX!</h2>
          <p>Please sign in to start browsing.</p>
        </div>
      ) : (
        <div>
          {posts.map((post: Record<string, any>) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostFeed;
