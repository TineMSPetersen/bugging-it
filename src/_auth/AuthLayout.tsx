import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const isAutchenticated = false;

  return (
      <>
        {isAutchenticated ? (
          <Navigate to ="/" />
        ): (
          <>
            <section className='flex flex-1 justify-center items-center flex-col py-10'>
              <Outlet />
            </section>

            <img
             src="/assets/images/side-img.jpg"
             alt="logo"
             className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'
            />
          </>
        )}
      </>
  )
}

export default AuthLayout
