import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { UseGetAllUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import React from 'react'

const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = UseGetAllUsers();

  return (
    <div className="flex flex-1">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Buggers</h2>

        { isUserLoading && !creators ? (<Loader />
          ) : (
            <div className='w-full grid grid-cols-3 gap-5 justify-between mt-5'>
              {creators?.documents.map((creator: Models.Document) => (
                <UserCard link={`profile/${creator.$id}`} img={creator.imageUrl} name={creator.name} />
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default AllUsers