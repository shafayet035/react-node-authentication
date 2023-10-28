import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return <>{children}</>;
};

export default AuthProvider;
