function Pagination({currentPage, totalPages, onPageChange}) {
  return (
    <div className='flex gap-2 items-center mt-6'>
      <button 
        className='px-4 py-2 border border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        >
        Previous
      </button>
      
       {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 border rounded-lg transition-colors ${
            currentPage === index + 1 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'border-black hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      
      <button 
        className='px-4 py-2 border border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination