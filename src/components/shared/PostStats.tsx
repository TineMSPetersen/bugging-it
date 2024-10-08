import { useLikePost, useSavePost, UseDeleteSavePost, useGetCurrentUser, } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";

type PostStatsProps= {
  post?: Models.Document;
  userId: string;
}

const PostStats = ({post, userId}: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const [ likes, setLikes ] = useState(likesList);
  const [ isSaved, setIsSaved ] = useState(false);
  
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSave } = UseDeleteSavePost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false)
  }, [currentUser])

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // stops you from going to different page if you click like

    let likesArray = [...likes];

    if(likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post?.$id || '', likesArray });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // stops you from going to different page if you click save

    if(savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id)

    } else {
      savePost({ userId: userId, postId: post?.$id || '' });
      setIsSaved(true);
    }
  };
  
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={checkIsLiked(likes, userId)
            ? "/assets/icons/liked.svg" 
            : "/assets/icons/like.svg"
            }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="snmall-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSave ? <Loader /> : <img
          src={isSaved
            ? "/assets/icons/saved.svg" 
            : "/assets/icons/save.svg"
            }
          alt="save"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />}
      </div>
    </div>
  )
}

export default PostStats
