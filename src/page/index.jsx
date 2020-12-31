import React from "react";
import Container from "./container";
import styled from "styled-components";
import SearchBox from "../components/searchBox";
import FullPageLoader from "../components/FullPageLoader";
import Filters from "../components/filter";
import { size, map } from "lodash";

const ConferenceList = props => {
  const {
    isLoading,
    conferenceDataList,
    isError,
    filteredData,
    searchFieldEnable,
    showFilter,
    showFilterModal,
    sortFilter,
    handleCheckBoxChange,
    isFiltersApply,
    searchedValue
  } = props;

  const data =
    searchFieldEnable || isFiltersApply ? filteredData : conferenceDataList;
  return (
    <>
      {isLoading && <FullPageLoader layerIndex={2} />}
      {showFilterModal && <Filters {...props} />}
      <PageWrapper>
        <ListWrapper>
          <ListHeading>
            <ListTitle>Conferences</ListTitle>
            <ListDetails>
              Welcome to the Conferences Dashboard. You can view Conferences
              from the below list. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </ListDetails>
            <FilterData>
              <SearchBox
                id="searchBoxInputValue"
                bgColor="#fff"
                padding="13px 0"
                border="1px solid rgba(151, 151, 151, 0.3);"
                float="none"
                handleChange={props.handleFilter}
                marginRight="15px"
                searchedValue={searchedValue}
              />
              <AddFilter onClick={showFilter}>Add Filter</AddFilter>
            </FilterData>
            <FilterList>
              {size(sortFilter) > 0 && (
                <ul>
                  {map(sortFilter, eachFilter => {
                    return (
                      <li>
                        <span>{eachFilter.filterName}</span>
                        <i
                          className="fa fa-close"
                          onClick={() => {
                            handleCheckBoxChange(
                              {
                                target: {
                                  value: eachFilter.filterName,
                                  checked: false
                                }
                              },
                              eachFilter.filterType
                            );
                          }}
                        ></i>
                      </li>
                    );
                  })}
                </ul>
              )}
            </FilterList>
          </ListHeading>
          <ListContent props={props}>
            <ListUl>
              {isLoading ? (
                <LoadingLi>Data Fetching</LoadingLi>
              ) : !isLoading && isError ? (
                <LoadingLi>Sorry, Something Went Wrong!</LoadingLi>
              ) : !isLoading && !isError && size(data) === 0 ? (
                <LoadingLi>No Data Found</LoadingLi>
              ) : (
                !isLoading &&
                !isError &&
                size(data) > 0 &&
                map(data, (eachConference, index) => {
                  const {
                    imageURL,
                    confName,
                    confStartDate,
                    confEndDate,
                    entryType,
                    venue,
                    confUrl,
                    city
                  } = eachConference;
                  return (
                    <ConforenceLi key={index}>
                      <figure>
                        <img src={imageURL} alt="" />
                      </figure>
                      <ConferenceDetails>
                        <Detail>
                          Name : <Info>{confName}</Info>
                        </Detail>
                        <Detail>
                          Start Date : <Info>{confStartDate}</Info>
                        </Detail>
                        <Detail>
                          End Date : <Info>{confEndDate}</Info>
                        </Detail>
                        <Detail>
                          Entry Type : <Info>{entryType}</Info>
                        </Detail>
                        <Detail>
                          Venue : <Info>{venue}</Info>
                        </Detail>
                        <Detail>
                          City : <Info>{city ? city : "city not present"}</Info>
                        </Detail>
                        <Detail>
                          Link to Visit :{" "}
                          <VisitingLink href={confUrl} target="_blank">
                            {confUrl}
                          </VisitingLink>
                        </Detail>
                      </ConferenceDetails>
                    </ConforenceLi>
                  );
                })
              )}
            </ListUl>
          </ListContent>
        </ListWrapper>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  max-width: 1920px;
  width: 70%;
  padding: 30px 0;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;
`;

const ListWrapper = styled.div``;

const ListHeading = styled.div``;

const ListTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #636363;
  font-size: 30px;
`;

const ListDetails = styled.p`
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  color: #363636;
  opacity: 0.67;
  margin: 0 0 35px;
`;

const ListContent = styled.div`
  margin: 50px 0;
  border-radius: 5px;
  background-color: ${props =>
    props.props.isLoading || props.props.isError ? "transparent" : "#fff"};
  box-shadow: ${props =>
    props.props.isLoading || props.props.isError
      ? "none"
      : "4px 8px 20px 0 rgba(0, 0, 0, 0.14)"};
`;

const ListUl = styled.ul`
  padding: 20px;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LoadingLi = styled.li`
  width: 100%;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;

const ConforenceLi = styled.li`
  width: 32%;
  margin-right: 2%;
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 4px 8px 20px 0 rgba(0, 0, 0, 0.14);

  &:nth-child(3n + 3) {
    margin-right: 0;
  }

  &:hover img {
    width: 110%;
  }

  figure {
    width: 100%;
    height: 140px;
    margin: 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    transition: 0.3s ease-in-out;

    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      transition: 0.3s ease-in-out;

      &::before {
        content: "No Image Found";
        width: 100%;
        height: 140px;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.07);
        font-size: 12px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  @media (max-width: 1000px) {
    width: 48%;

    &:nth-child(2n + 2) {
      margin-right: 0;
    }

    &:nth-child(3n + 3) {
      margin-right: 2%;
    }
  }

  @media (max-width: 665px) {
    width: 100%;
    margin-right: 0;

    &:nth-child(2n + 2) {
      margin-right: 0;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
`;

const ConferenceDetails = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Detail = styled.span`
  margin-bottom: 4px;
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #636363;
  line-height: 15px;
  overflow: hidden;
`;

const Info = styled.span`
  font-weight: 400;
  line-height: 13px;
  text-align: justify;
`;

const VisitingLink = styled.a`
  font-weight: 400;
  line-height: 13px;
  text-align: justify;
`;

const FilterData = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;

  .search-wrapper {
    input {
      @media (max-width: 610px) {
        width: 100%;
      }
    }
    @media (max-width: 610px) {
      width: 100%;
      padding: 0 0 0 50px;
      margin-right: 0;
      text-align: left;
    }
  }
`;

const AddFilter = styled.span`
  padding: 12px 20px;
  border: 1px solid rgb(232, 119, 34);
  border-radius: 3px;
  background-color: rgb(232, 119, 34);
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: rgb(232, 119, 34);
  }

  @media (max-width: 610px) {
    margin-top: 20px;
  }
`;

const FilterList = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    background-color: rgb(232, 119, 34);
    color: #fff;
  }

  i {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default Container(ConferenceList);
