import { Link } from 'react-router-dom';

type UserCardProps= {
  link: string;
  img: string;
  name: string;
  username: string;
}

const UserCard = ({link, img, name, username}: UserCardProps) => {
  return (
    <Link
      to={link}
    >
      <div className='user-card'>
        <img className='rounded-full' src={img} alt={name} width={54} height={54}/>
        <p className='base-medium lg:body-regular text-light-1'>{name}</p>
        <p className='small-regular md:body-small text-light-3'>@{username}</p>
      </div>
    </Link>
  )
}

export default UserCard
