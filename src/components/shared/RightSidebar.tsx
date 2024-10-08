import UserCard from './UserCard'
import { UseGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import Loader from './Loader';

const RightSidebar = () => {
const {
  data: creators,
  isLoading: isUserLoading
} = UseGetUsers();

console.log(creators);

  return (
    <div className='rightsidebar'>
      <h2 className="h4-bold md:h3-bold text-left w-full">
        Newest Buggers
      </h2>
      
      { isUserLoading && !creators ? (<Loader />
          ) : (
            <div className='grid grid-cols-2 gap-5 mt-5'>
              {creators?.documents.map((creator: Models.Document) => (
                <UserCard link={`profile/${creator.$id}`} img={creator.imageUrl} name={creator.name} username={creator.username}/>
              ))}
            </div>
          )}
    </div>
  )
}

export default RightSidebar
