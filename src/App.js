import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { StaggeredMotion, spring, presets } from "react-motion";
import * as R from "ramda";

const Box = styled.div`
  color: white;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const COUNT = 10;
const SIZE = 75;

class App extends Component {
  state = {
    following: false,
    positionX: window.innerWidth / 2,
    positionY: window.innerHeight / 2
  };

  componentDidMount() {
    this.setState({ following: true });
    window.addEventListener("mousemove", this.setPositionFromEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.setPositionFromEvent);
  }

  setPositionFromEvent = ({ clientX, clientY }) => {
    this.setState({
      positionX: clientX,
      positionY: clientY
    });
  };

  render() {
    const { positionX, positionY } = this.state;

    return (
      <StaggeredMotion
        defaultStyles={R.range(0, COUNT).map(() => ({
          positionX,
          positionY
        }))}
        styles={prev =>
          prev.map(
            (_, i) =>
              i === 0
                ? { positionX, positionY }
                : {
                    positionX: spring(prev[i - 1].positionX, presets.stiff),
                    positionY: spring(prev[i - 1].positionY, presets.stiff)
                  }
          )
        }
      >
        {cards => (
          <Fragment>
            {cards.map(({ positionX, positionY }, index) => {
              const size = SIZE * index + SIZE;

              return (
                <Box
                  key={index}
                  style={{
                    top: `${positionY - size / 2}px`,
                    left: `${positionX - size / 2}px`,
                    backgroundColor: `hsl(6, 93%, ${index * 80 / COUNT + 20}%)`,
                    zIndex: COUNT - index
                  }}
                  size={size}
                >
                  <span role="img" aria-label="watermelon">
                    🍉
                  </span>
                </Box>
              );
            })}
          </Fragment>
        )}
      </StaggeredMotion>
    );
  }
}

export default App;
