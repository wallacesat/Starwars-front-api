import React, { Component, Fragment } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { selectPagePagination } from "../../store/actions/pagination";

class PaginationComponent extends Component {
  getDataState() {
    const { state, resource } = this.props;

    return !state[resource] || state[resource].isFetching
      ? {
          pageCount: 4,
          selectedPage: 1
        }
      : {
          pageCount: state[resource].pageCount,
          selectedPage: state.pagination.page
        };
  }

  handlePagination() {
    const { pageCount, selectedPage } = this.getDataState();

    let arr =
      selectedPage > 0 && selectedPage < 3
        ? [1, 2, 3]
        : selectedPage > 2 && selectedPage < pageCount - 1
        ? [selectedPage - 1, selectedPage, selectedPage + 1]
        : [pageCount - 2, pageCount - 1, pageCount];

    return arr.map((item, i) => (
      <PaginationItem key={i} active={item === selectedPage}>
        <PaginationLink onClick={() => this.selectPage(item)}>
          {item}
        </PaginationLink>
      </PaginationItem>
    ));
  }

  selectPage(page) {
    const { selectPagePagination } = this.props;
    selectPagePagination(page);
  }

  render() {
    const { pageCount, selectedPage } = this.getDataState();
    return (
      <Pagination>
        <PaginationItem {...(selectedPage === 1 ? "disabled" : "")}>
          <PaginationLink first="true" onClick={() => this.selectPage(1)}>
            First
          </PaginationLink>
        </PaginationItem>
        {this.handlePagination()}
        <PaginationItem {...(selectedPage === pageCount ? "disabled" : "")}>
          <PaginationLink
            last="true"
            onClick={() => this.selectPage(pageCount)}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {
  selectPagePagination
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaginationComponent)
);
