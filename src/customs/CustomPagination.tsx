import { Pagination } from "react-admin";

export const CustomPagination = (props) => {
  const { page, perPage, total, setPage } = props;

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <Pagination
      page={page}
      perPage={perPage}
      total={total}
      setPage={setPage}
      rowsPerPageOptions={[5, 10, 25, 50]} // Customize rows per page options
      component="div"
      hasPreviousPage="Previous"
      hasNextPage="Next"
      onPrevPage={handlePrevPage} // Pass the callback to onPrevPage prop
      onNextPage={handleNextPage} // Pass the callback to onNextPage prop
      // Render arrow buttons and other pagination elements
      {...props}
    />
  );
};