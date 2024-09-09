import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { UseDeletePost, UseGetPostById } from '@/lib/react-query/queriesAndMutations'
import { formatDateString } from '@/lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { mutate: deletePost } = UseDeletePost();
  
  const { data: post, isPending } = UseGetPostById(id || '');

  const handleDeletePost = () => {
    deletePost({ postId: id || '', imageId: post?.imageId });
    navigate(-1);
  }
  
  return (
    <div className='post_details-container'>
      {isPending ? <Loader /> : (
        <div className='post_details-card'>
          <img
            src={post?.imageUrl}
            alt="post"
            className='post_details-img'
          />
          
          <div className='post_details-info'>
            <div className='flex-between w-full'>
            <div className='flex items-center gap-3 py-5'>
              <Link to={`/profile/${post?.creator.$id}`}>
                <img
                  src={post?.creator?.imageUrl || `/assets/icons/profile-placeholder.svg`}
                  alt="creator avatar"
                  className='rounded-full w-12 lg:h-12'
                />
              </Link>
            

              <div className='flex flex-col'>
                <a className='base-medium lg:body-bold text-light-1' href={`/profile/${post?.creator.$id}`}>{post?.creator.name}</a>
          
                <div className='text-light-3'>
                  <p className='subtle-semibold lg:small-regular'>
                    {formatDateString(post?.$createdAt || '')}
                  </p>
                  <p className='subtle-semibold lg:small-regular'>
                  {post?.location}
                  </p>
                </div>
              </div>
            </div> 
              <div className='flex-center gap-4'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit post"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img src="/assets/icons/delete.svg" alt="delete post" width={24} height={24} />
                </Button>
              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />
            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex gap-2 mt-2'>
                {post?.tags.map((tag: string) => (
                <li key={tag} className='text-light-3'>
                  #{tag}
                </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails