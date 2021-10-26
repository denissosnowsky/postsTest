import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

interface PaginationType {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  allCount: number;
  portionSize?: number;
  extClb?: any
}

const PaginationFC: React.FC<PaginationType> = ({
  page,
  setPage,
  pageSize,
  allCount,
  portionSize = 3,
  extClb
}) => {
  const [active, setActive] = useState(page);
  let pagesCount = Math.ceil(allCount / pageSize);

  let pageArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageArray.push(i);
  }

  //make portions of numbers buttons for pagination
  let [portionNumber, setPortionNumber] = useState(1);
  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const handleChoosePage = (p: number) => {
    setPage(p);
    setActive(p);
  };

  const handleFirstPortion = () => {
    setPortionNumber(1);
    handleChoosePage(1);
  };
  const handleLastPortion = () => {
    setPortionNumber(portionCount);
    handleChoosePage(pagesCount);
  };
  const handlePrevPortion = () => {
    setPortionNumber(portionNumber - 1);
  };
  const handleNextPortion = () => {
    setPortionNumber(portionNumber + 1);
  };
  const handlePrevPage = () => {
    setPortionNumber(portionNumber - 1);
    setPage(leftPortionPageNumber - 1);
  };
  const handleNextPage = () => {
    setPortionNumber(portionNumber + 1);
    setPage(rightPortionPageNumber + 1);
  };

  useEffect(() => {
    setActive(page);
    setPortionNumber(Math.ceil(page / portionSize));
  }, [page]);

  return (
    <Pagination className="justify-content-center mt-3 mb-3">
      {portionNumber > 1 && (
        <>
          <Pagination.First onClick={handleFirstPortion} />
          <Pagination.Prev onClick={handlePrevPortion} />
          <Pagination.Ellipsis onClick={handlePrevPage} />
        </>
      )}
      {pageArray
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <Pagination.Item
            key={p}
            onClick={() => {
              setPage(p);
              setActive(p);
              extClb && extClb();
            }}
            active={p === active}
            activeLabel=""
          >
            {p}
          </Pagination.Item>
        ))}
      {portionCount > portionNumber && (
        <>
          <Pagination.Ellipsis onClick={handleNextPage} />
          <Pagination.Next onClick={handleNextPortion} />
          <Pagination.Last onClick={handleLastPortion} />
        </>
      )}
    </Pagination>
  );
};

export default PaginationFC;
