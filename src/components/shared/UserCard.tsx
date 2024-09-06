import React from 'react'
import { Link } from 'react-router-dom';

type UserCardProps= {
  link: string;
  img: string;
  name: string;
}

const UserCard = ({link, img, name}: UserCardProps) => {
  return (
    <Link
      to={link}
    >
      <div className='user-card'>
        <img src={img} alt={name} width={54} height={54}/>
        <p className='base-medium lg:body-regular text-light-1'>{name}</p>
      </div>
    </Link>
  )
}

export default UserCard
