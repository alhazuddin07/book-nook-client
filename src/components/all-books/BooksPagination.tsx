import { Button } from "@/components/ui/button";

type BooksPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const BooksPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: BooksPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="my-8 flex max-w-full flex-wrap items-center justify-center gap-2 px-2 sm:my-10">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-[#4935d4] hover:bg-[#3925bd] dark:bg-brand dark:hover:bg-brand-strong"
                : ""
            }
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default BooksPagination;