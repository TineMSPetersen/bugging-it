import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { UseGetPostsByUser, UseGetSavedPosts, useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Outlet, useParams } from 'react-router-dom';

const Profile = () => {
  const authenticatedUser = useUserContext();
  const { id } = useParams();
  const { data: user } = useGetUserById(id || "");

  const { data: posts, isLoading: isPostsLoading,
    isError: isErrorPosts, } = UseGetPostsByUser(id);

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img src={user?.imageUrl} alt={`${user?.username}'s avatar`} className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{user?.name}</h1>
              <h2 className='className="small-regular md:body-medium text-light-3 text-center xl:text-left'>@{user?.username}</h2>
            </div>
          
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            Hello
            </div>
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {user?.bio}
            </p>
          </div>
        </div>
      </div>
      { isPostsLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="flex gap-9 w-full">
          {posts?.documents.map((post: Models.Document) => (
            <GridPostList key={post.$id} posts={[post]} showUser={false} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Profile