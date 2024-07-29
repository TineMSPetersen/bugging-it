import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const isAutchenticated = false;

  return (
    <div>
      <>
        {isAutchenticated ? (
          <Navigate to ="/" />
        ): (
          <>
            <section>
              <Outlet />
            </section>
          </>
        )}
      </>
    </div>
  )
}

export default AuthLayout
