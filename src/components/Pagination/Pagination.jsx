import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();

  const handleChangeCount = (event) => {
    dispatch(setCurrentPage(event.selected + 1));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handleChangeCount}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
