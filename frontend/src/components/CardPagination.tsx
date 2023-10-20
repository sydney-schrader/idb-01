interface CardPaginationProps {
    itemsPerPage: number, 
    totalItems: number, 
    paginate:(pageNumber: any)=> void
  }
  

  function CardPagination (props: CardPaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => props.paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CardPagination;