import React, { Component } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

class PaginationComponent extends Component {

    handlePagination(data) {
        let {onSelected} = this.props;

        let arr = data.page > 0 && data.page < 3 ? [1,2,3] :
            data.page > 2 && data.page < data.pageCount-1 ? [data.page-1, data.page, data.page+1] : 
                [data.pageCount-2, data.pageCount-1, data.pageCount];

        return arr.map((item, i) =>
            <PaginationItem key={i} active={item === data.page}>
                <PaginationLink onClick={() => onSelected(item, `${data.object}`.charAt(0).toLowerCase() + `${data.object}`.slice(1))}>
                    {item}
                </PaginationLink>
            </PaginationItem>
        )
    }

    render() {
        let data = this.props.data;
        let { onSelected } = this.props;
        return (
            <Pagination>
                <PaginationItem {...data.page === 1 ? 'disabled' : ''}>
                    <PaginationLink first='true' onClick={() => onSelected(1, `${data.object}`.charAt(0).toLowerCase() + `${data.object}`.slice(1))} >
                        First
                    </PaginationLink>
                </PaginationItem>
                {
                    this.handlePagination(data)
                }
                <PaginationItem {...data.page === data.pageCount ? 'disabled' : ''}>
                    <PaginationLink last='true' onClick={() => onSelected(data.pageCount, `${data.object}`.charAt(0).toLowerCase() + `${data.object}`.slice(1))} >
                        Last
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}

export default PaginationComponent;