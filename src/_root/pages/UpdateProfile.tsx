import PostForm from '@/components/forms/PostForm'
import ProfileForm from '@/components/forms/ProfileForm'
import React from 'react'

const UpdateProfile = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
          src="/assets/icons/edit.svg"
          width={36}
          height={36}
          alt="add" />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Update Profile</h2>
        </div>

        <ProfileForm />
      </div>
    </div>
  )
}

export default UpdateProfile