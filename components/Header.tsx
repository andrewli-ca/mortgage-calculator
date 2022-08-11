import Image from 'next/image';
import styled from 'styled-components';
import Hamburger from '../public/hamburger.svg';
import Logo from '../public/p8Wordmark_sm.svg';
import { Container } from './sharedstyles';

const StyledHeader = styled.header`
  background-color: #fff;
  height: 52px;
  position: relative;
  z-index: 1;
`;

const StyledNav = styled.nav`
  padding: 12px 16px;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;

  @media screen and (min-width: 768px) {
    padding-left: 54px;
    padding-right: 54px;
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: auto;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledNav>
        <HeaderContainer>
          <Image src={Logo} alt="Logo" />
          <Image src={Hamburger} alt="Menu" />
        </HeaderContainer>
      </StyledNav>
    </StyledHeader>
  );
}

export { Header };
