import { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const Main = styled.main`
  height: calc(100% - 52px); // subtract header height
  width: 100%;
`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
    </Fragment>
  );
}
