import React from "react";
import styled from "styled-components";
import hexToRgba from "../../utils/hexToRgba";

// First way to import
import { FadeLoader } from "react-spinners";

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    let { layerIndex } = this.props;
    return (
      <Container layerIndex={layerIndex} className="full-page-loader">
        <LoaderContainer className="sweet-loading">
          <FadeLoader
            sizeUnit={"px"}
            size={this.props.size}
            margin={"2px"}
            loading={this.state.loading}
            color={"#123abc"}
          />
        </LoaderContainer>
      </Container>
    );
  }
}

AwesomeComponent.defaultProps = {
  size: 50,
  layerIndex: 1002
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: ${props => props.layerIndex};
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(17, 17, 17, 0.36);
`;

const LoaderContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: calc(50%);
  left: calc(50% + 12px);
  transform: translate(-50%, -50%);
  background-color: ${props => hexToRgba("#000000", 0.8)};
  border-radius: 50%;
  padding: 5px;

  > div {
    left: 25px;
  }

  > div > div {
    background-color: ${props =>
      (props.theme &&
        Object.keys(props.theme).length !== 0 &&
        props.theme.COLOR.USER_PRIMARY) ||
      "#ddd"};
  }
`;

export default AwesomeComponent;
