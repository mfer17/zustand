import { Navigate, Outlet, useLocation, BrowserRouter } from 'react-router-dom';


export const Root = () => {

  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <BrowserRouter basename="/zustand">
      <Outlet />
    </BrowserRouter>
  )
}