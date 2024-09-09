import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthContext';
import { UseGetPostsByUser, useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id || "");

  const { data: posts, isLoading: isPostsLoading } = UseGetPostsByUser(id);

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img src={currentUser?.imageUrl} alt={`${currentUser?.username}'s avatar`} className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{currentUser?.name}</h1>
              <h2 className='className="small-regular md:body-medium text-light-3 text-center xl:text-left'>@{currentUser?.username}</h2>
            </div>
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser?.bio}
            </p>
          </div>
          <Link
                  to={`/update-profile/${user.id}`}
                  className={`${user.id !== id && 'hidden'}`}
                >
                  <div className='flex gap-3'>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit post"
                    width={24}
                    height={24}
                  />
                  <p>Update Profile</p>
                  </div>
                </Link>
        </div>
      </div>
      { isPostsLoading && !posts ? (
        <Loader />
      ) : (
        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
          {posts?.documents.map((post: Models.Document) => (
            <GridPostList key={post.$id} posts={[post]} showUser={false} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile