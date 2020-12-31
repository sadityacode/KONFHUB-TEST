import React from "react";
import styled from "styled-components";
import { get, set, each, filter, size, map } from "lodash";
import hexToRgba from "../../utils/hexToRgba";

// First way to import
import { FadeLoader } from "react-spinners";

const FiltersComponent = props => {
  const { allFilter, handleCheckBoxChange, hideFilter, sortFilter } = props;
  console.log(props);
  return (
    <>
      <Container>
        <Filters>
          <Heading>Add Filters</Heading>
          {size(allFilter) > 0 ? (
            <FilterWrapper>
              {map(allFilter, eachFilterType => {
                return (
                  <EachFilter>
                    <FilterType>{eachFilterType.type}</FilterType>
                    <FilterUl>
                      {map(eachFilterType.filter, eachFilter => {
                        let isFilterPresent = false;
                        map(sortFilter, filter => {
                          filter.filterName === eachFilter &&
                            (isFilterPresent = true);
                        });
                        return (
                          <FilterLi>
                            <input
                              type="checkbox"
                              id={eachFilter}
                              name={eachFilter}
                              value={eachFilter}
                              checked={isFilterPresent}
                              onChange={e => {
                                handleCheckBoxChange(e, eachFilterType.type);
                              }}
                            />
                            <label htmlFor={eachFilter}>{eachFilter}</label>
                          </FilterLi>
                        );
                      })}
                    </FilterUl>
                  </EachFilter>
                );
              })}
            </FilterWrapper>
          ) : (
            <span>No Filtes Available</span>
          )}
          <FilterControls>
            <i className="fa fa-close" onClick={hideFilter}></i>
          </FilterControls>
        </Filters>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Filters = styled.div`
  width: 70%;
  padding: 30px;
  margin: 50px auto 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
`;

const Heading = styled.h2`
  color: rgba(0, 0, 0, 0.8);
`;

const FilterWrapper = styled.div``;

const EachFilter = styled.div``;

const FilterType = styled.h3`
  color: rgba(0, 0, 0, 0.5);
  text-transform: capitalize;
`;

const FilterUl = styled.ul`
  list-style: none;
`;

const FilterLi = styled.li`
  width: 15%;
  padding: 0 15px 15px 0;
  display: inline-block;
  text-transform: capitalize;
  box-sizing: border-box;

  input {
    margin-right: 7px;
  }

  label {
    font-size: 15px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const FilterControls = styled.span`
  position: absolute;
  top: 50px;
  right: 50px;

  i {
    font-size: 20px;
    cursor: pointer;
  }
`;

export default FiltersComponent;
