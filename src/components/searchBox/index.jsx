import React from "react";
import styled from "styled-components";
import hexToRgba from "../../utils/hexToRgba";
import { FaSistrix } from "react-icons/fa";

const SearchBox = props => {
  let {
    handleChange,
    placeholder,
    bgColor,
    padding,
    border,
    float,
    marginRight,
    eventOnKeyUp,
    searchedValue,
    ...rest
  } = props;

  /**
   * Block to set timer if user has stopped typing
   */
  let typingTimer; //timer identifier
  let doneTypingInterval = 1000;

  let handleKeyChange = (e, up) => {
    if (eventOnKeyUp) {
      clearTimeout(typingTimer);
      if (up) {
        typingTimer = setTimeout(() => {
          handleChange(e);
        }, doneTypingInterval);
      }
    }
  };

  return (
    <SearchWrapper
      bgColor={bgColor}
      border={border}
      float={float}
      marginRight={marginRight}
      className="search-wrapper"
    >
      <SearchIcon size={16} />
      <SearchInput
        {...rest}
        placeholder={
          placeholder || "You can search conference by name or cities"
        }
        value={searchedValue ? searchedValue : ""}
        type="text"
        padding={padding}
        onChange={e => {
          !eventOnKeyUp && handleChange(e);
        }}
        onKeyDown={handleKeyChange}
        onKeyUp={e => {
          e.persist();
          handleKeyChange(e, true);
        }}
        className="search-field"
      />
    </SearchWrapper>
  );
};

export default SearchBox;

const SearchWrapper = styled.div`
  text-align: right;
  width: 380px;
  min-width: 270px;
  float: ${props => (props.float ? props.float : "right")};
  border-radius: 4px;
  border: ${props => (props.border ? props.border : "none")};
  border: none;
  background-color: ${hexToRgba("#e6e6e6", 0.51)};
  box-sizing: border-box;
  position: relative;
  margin-right: ${props => (props.marginRight ? props.marginRight : "none")};
  display: inline-block;
  @media (max-width: 768px) {
    width: 297px;
  }
`;

const SearchInput = styled.input`
  width: 338px;
  min-width: 260px;
  line-height: 20px;
  padding: ${props => (props.padding ? props.padding : "12px 0")};
  border: none;
  outline: none;
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
  height: 46px;

  @media (max-width: 768px) {
    width: 260px;
  }
`;

const SearchIcon = styled(FaSistrix)`
  color: #636363;
  transform: translate(13px, 5px) rotateY(180deg);
  position: absolute;
  top: 10px;
  left: 0;
`;
