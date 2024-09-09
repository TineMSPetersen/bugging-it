import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { UseGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import React from 'react'

const Saved = () => {
  const { user } = useUserContext();
  const { data: posts, isLoading: isPostsLoading,
    isError: isErrorPosts, } = UseGetSavedPosts(user.id);

  console.log("POST")
  console.log(posts);
  console.log("POST END")

  return (
    <div className="saved-container">
    <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
    { isPostsLoading && !posts ? (<Loader />
          ) : (
            <ul className="grid xl:grid-cols-2 gap-9 w-full justify-around">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post.post} />
              ))}
            </ul>
          )}
    </div>
  )
}

export default Saved