import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { UseGetAllUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
  } = UseGetAllUsers();

  return (
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Buggers</h2>

        { isUserLoading && !creators ? (<Loader />
          ) : (
            <div className='w-full grid 2xl:grid-cols-2 md:grid-cols-1 gap-5 justify-center mt-5'>
              {creators?.documents.map((creator: Models.Document) => (
                <UserCard link={`/profile/${creator.$id}`} img={creator.imageUrl} name={creator.name} username={creator.username}/>
              ))}
            </div>
          )}
      </div>

  )
}

export default AllUsers