import React, { Component } from "react";
import { getConferenceList } from "./services";
import { each, filter, size, map } from "lodash";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const { LOADING_CONFERENCE, SUCCESS_CONFERENCE, ERROR_CONFERENCE } = state;

  return {
    ...LOADING_CONFERENCE,
    ...SUCCESS_CONFERENCE,
    ...ERROR_CONFERENCE
  };
};

const mapDispatchToProps = {
  getConferenceList
};

const Container = Main =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class Presentation extends Component {
      static defaultProps = {
        role: "admin"
      };
      state = {
        conferenceDataList: [],
        filteredData: [],
        searchedValue: "",
        searchFieldEnable: false,
        isFiltersApply: false,
        showFilterModal: false,
        cityFilter: ["mumbai", "pune", "bangalore", "delhi"],
        monthFilter: [
          "jan",
          "feb",
          "march",
          "apr",
          "may",
          "june",
          "july",
          "aug",
          "sept",
          "oct",
          "nov",
          "dec"
        ],
        entryTypeFilter: ["free", "paid"],
        countryFilter: ["india"],
        allFilter: [],
        filters: [],
        sortFilter: []
      };

      componentDidMount() {
        // // load presentation list
        this.setState({
          allFilter: [
            {
              type: "city",
              filter: this.state.cityFilter
            },
            {
              type: "month",
              filter: this.state.monthFilter
            },
            {
              type: "entryType",
              filter: this.state.entryTypeFilter
            },
            {
              type: "state",
              filter: this.state.countryFilter
            }
          ]
        });
        this._fetchConferenceList();
      }

      _fetchConferenceList = async () => {
        const responce = await this.props.getConferenceList();
        if (responce.status === 200) {
          const list = [...responce.data.free, ...responce.data.paid];
          await this.setState({
            conferenceDataList: [...list]
          });
        } else {
          await this.setState({
            conferenceDataList: []
          });
        }
      };

      handleFilter = async e => {
        const { value } = e.target;
        const { conferenceDataList, isFiltersApply, filteredData } = this.state;

        if (size(conferenceDataList) > 0) {
          let data = isFiltersApply ? filteredData : conferenceDataList;
          let filtered = [];

          filtered = filter(data, eachConference => {
            const { confName, city } = eachConference;
            return (
              confName.toLowerCase().indexOf(value.trim().toLowerCase()) !==
                -1 ||
              city.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
            );
          });

          await this.setState({
            filteredData: filtered
          });

          !value
            ? this.setState({
                searchFieldEnable: false
              })
            : this.setState({
                searchFieldEnable: true
              });
        }

        await this.setState({
          searchedValue: value
        });
      };

      showFilter = () => {
        this.setState({
          showFilterModal: true
        });
      };

      hideFilter = () => {
        this.setState({
          showFilterModal: false
        });
      };

      handleCheckBoxChange = async (e, filterType) => {
        const { checked, value } = e.target;
        let { filters } = this.state;
        if (checked) {
          let isFilterPresent = false;
          map(filters, eachFilter => {
            eachFilter.type === filterType && (isFilterPresent = true);
          });

          if (isFilterPresent) {
            each(filters, eachFilter => {
              eachFilter.type === filterType && eachFilter.filter.push(value);
            });
          } else {
            filters.push({
              type: filterType,
              filter: [value]
            });
          }

          this.setState({
            filters
          });

          this.sortFilters(filters);
        } else {
          each(filters, (eachFilter, index) => {
            if (eachFilter) {
              if (eachFilter.type === filterType) {
                eachFilter.filter = filter(
                  eachFilter.filter,
                  eachFilter => eachFilter !== value
                );
              }

              if (size(eachFilter.filter) === 0) {
                filters.splice(index, 1);
              }
            }
          });

          this.setState({
            filters
          });
        }

        await this.sortFilters(filters);
        await this.applyFilters();
        await this.handleFilter({ target: { value: "" } });
      };

      sortFilters = filters => {
        let sortFilter = [];
        if (size(filters) > 0) {
          map(filters, eachFilter => {
            if (size(eachFilter.filter) > 0) {
              map(eachFilter.filter, filter => {
                sortFilter.push({
                  filterType: eachFilter.type,
                  filterName: filter
                });
              });
            }
          });
        }

        this.setState({
          sortFilter
        });
      };

      applyFilters = () => {
        const { conferenceDataList, filters, sortFilter } = this.state;
        let sortedList = [];

        if (size(conferenceDataList) > 0 && size(filters) > 0) {
          map(filters, (eachFilterType, index) => {
            if (size(eachFilterType.filter) > 0) {
              if (eachFilterType.type === "city") {
                let data = index !== 0 ? sortedList : conferenceDataList;
                //empty the array to add filtered entity
                sortedList = [];
                map(eachFilterType.filter, everyFilter => {
                  map(data, eachList => {
                    eachList.city
                      .toLowerCase()
                      .indexOf(everyFilter.toLowerCase()) !== -1 &&
                      sortedList.push(eachList);
                  });
                });
              } else if (eachFilterType.type === "month") {
                let data = index !== 0 ? sortedList : conferenceDataList;
                //empty the array to add filtered entity
                sortedList = [];
                map(eachFilterType.filter, everyFilter => {
                  map(data, eachList => {
                    eachList.confStartDate
                      .toLowerCase()
                      .indexOf(everyFilter.toLowerCase()) !== -1 &&
                      sortedList.push(eachList);
                  });
                });
              } else if (eachFilterType.type === "entryType") {
                let data = index !== 0 ? sortedList : conferenceDataList;
                //empty the array to add filtered entity
                sortedList = [];
                map(eachFilterType.filter, everyFilter => {
                  map(data, eachList => {
                    eachList.entryType
                      .toLowerCase()
                      .indexOf(everyFilter.toLowerCase()) !== -1 &&
                      sortedList.push(eachList);
                  });
                });
              } else if (eachFilterType.type === "state") {
                let data = index !== 0 ? sortedList : conferenceDataList;
                //empty the array to add filtered entity
                sortedList = [];
                map(eachFilterType.filter, everyFilter => {
                  map(data, eachList => {
                    eachList.state
                      .toLowerCase()
                      .indexOf(everyFilter.toLowerCase()) !== -1 &&
                      sortedList.push(eachList);
                  });
                });
              }
            }
          });

          this.setState({
            isFiltersApply:
              size(sortFilter) > 0 && size(sortFilter) > 0 ? true : false,
            filteredData:
              size(sortFilter) > 0 && size(sortFilter) > 0 ? sortedList : []
          });
        } else {
          this.setState({
            isFiltersApply: false
          });
        }
      };

      render() {
        const $this = this;

        /** Merge States and Methods */
        const stateMethodProps = {
          ...$this,
          ...$this.state,
          ...$this.props
        };
        return <Main {...stateMethodProps} />;
      }
    }
  );

export default Container;
