import { useUserContext } from '@/context/AuthContext';
import { formatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if(!post.creator) return;

  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3 py-5'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || `/assets/icons/profile-placeholder.svg`}
              alt="creator avatar"
              className='rounded-full w-12 lg:h-12'
              />
          </Link>

          <div className='flex flex-col'>
            <a className='base-medium lg:body-bold text-light-1' href={`/profile/${post.creator.$id}`}>{post.creator.name}</a>
            <a className='text-light-3 small-regular mb-1'>@{post.creator.username}</a>
          </div>
        </div>
        <Link to={`/update-post/${post.$id}`}
        className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img src="/assets/icons/edit.svg" alt="edit post" width={20} height={20} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <img src={post.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="post image" className='post-card_img rounded-md' />
        <div className='flex gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {formatDateString(post.$createdAt)}
              </p>
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
        
        <div className='small-medium lg:base-medium py-5'>
          <p>{post.caption}</p>
          <ul>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard