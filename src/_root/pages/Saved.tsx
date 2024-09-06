import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { UseGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import React from 'react'

const Saved = () => {
  const { user } = useUserContext();
  const { data: posts } = UseGetSavedPosts(user.id);

  console.log("POST")
  console.log(posts);
  console.log("POST END")

  return (
    <div>
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      dfdf
      <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <p>{post.user.name}</p>
              ))}
            </ul>
            sd
    </div>
  )
}

export default Saved