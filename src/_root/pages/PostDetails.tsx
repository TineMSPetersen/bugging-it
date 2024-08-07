import Loader from '@/components/shared/Loader';
import { UseGetPostById } from '@/lib/react-query/queriesAndMutations'
import { formatDateString } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = UseGetPostById(id || '');
  
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
          
                <div className='flex-center gap-2 text-light-3'>
                  <p className='subtle-semibold lg:small-regular'>
                    {formatDateString(post?.$createdAt)}
                  </p>
                  -
                  <p className='subtle-semibold lg:small-regular'>
                  {post?.location}
                  </p>
                </div>
              </div>
              
            </div>
          </div>
          <div className='flex-center gap-4'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails