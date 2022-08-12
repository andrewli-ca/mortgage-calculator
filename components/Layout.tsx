import React, { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const Main = styled.main`
  height: calc(100% - 52px); // subtract header height
  width: 100%;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
    </Fragment>
  );
}
