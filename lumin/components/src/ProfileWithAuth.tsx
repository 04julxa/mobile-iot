import React from 'react';
import { useAuth } from './context/authContext';

export function withAuth(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: React.ComponentProps<typeof Component>) {
    const { user } = useAuth();
    return <Component {...props} user={user} />;
  };
}
