import ReactPaginate from "react-paginate";

interface IPagination {
  onPageChange: (event: { selected: number;}) => void;
  pageCount: number;
  marginPagesDisplayed: number;
  pageRangeDisplayed: number;
  forcePage: number;
}

export const Pagination = ({onPageChange, pageCount, marginPagesDisplayed, pageRangeDisplayed, forcePage = 0 }: IPagination): JSX.Element => {
  return <ReactPaginate
    onPageChange={onPageChange}
    forcePage={forcePage}
    breakLabel="..."
    nextLabel=""
    previousLabel=""
    marginPagesDisplayed={marginPagesDisplayed}
    pageRangeDisplayed={pageRangeDisplayed}
    pageCount={pageCount}
    containerClassName="pagination"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="prev"
    previousLinkClassName="page-link"
    nextClassName="next"
    nextLinkClassName="page-link"
    breakClassName="page-item"
    breakLinkClassName="page-link"
  />
}
