import React from 'react'
import UserCard from './UserCard'
import { UseGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import Loader from './Loader';

const RightSidebar = () => {
const {
  data: creators,
  isLoading: isUserLoading,
  isError: isErrorCreators,
} = UseGetUsers();

console.log(creators);

  return (
    <div className='rightsidebar'>
      <h2 className="h4-bold md:h3-bold text-left w-full">
        Top Buggers
      </h2>
      
      { isUserLoading && !creators ? (<Loader />
          ) : (
            <div className='grid grid-cols-2 gap-5 mt-5'>
              {creators?.documents.map((creator: Models.Document) => (
                <UserCard link={`profile/${creator.$id}`} img={creator.imageUrl} name={creator.name} />
              ))}
            </div>
          )}
    </div>
  )
}

export default RightSidebar
