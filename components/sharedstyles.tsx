import styled from 'styled-components';

const Container = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const Title = styled.h1`
  color: #66747f;
  line-height: 1.15;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
`;

const Description = styled.p`
  color: #bdc9d5;
  line-height: 1.5;
  font-size: 10px;
`;

interface SpacerProps {
  size: number;
}

const Spacer = styled.div<SpacerProps>`
  min-height: ${(props) => props.size}px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 14px 24px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export { Container, Title, Description, Spacer, Button, Card };
