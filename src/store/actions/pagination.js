import { paginationAction } from "./actionsTypes";

const pageSelected = pagination => ({
  type: paginationAction.PAGE_SELECTED,
  pagination
});

export const selectPagePagination = page => dispatch => {
  dispatch(
    pageSelected({
      page
    })
  );
};
