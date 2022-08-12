import styled from 'styled-components';

const Container = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const Title = styled.h1`
  color: #66747f;
  line-height: 1.15;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;

  @media screen and (min-width: 768px) {
    font-size: 17px;
  }

  @media screen and (min-width: 896px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: #bdc9d5;
  line-height: 1.5;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 10px;
  }

  @media screen and (min-width: 896px) {
    font-size: 14px;
  }
`;

interface SpacerProps {
  size: number;
}

const Spacer = styled.div<SpacerProps>`
  min-height: ${(props) => props.size}px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 15px 24px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #fff #fff transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: ${(props) =>
      `transparent transparent ${props.theme.colors.primary} ${props.theme.colors.primary}`};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
  &::before {
    width: 32px;
    height: 32px;
    border-color: #fff #fff transparent transparent;
    animation: rotation 1.5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;

export { Container, Title, Description, Spacer, Button, Card, Spinner };
