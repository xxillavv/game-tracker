import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const LeadersPagesNavigation = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  return (
    <Pagination className="mb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Попередня"
            href={page === 1 ? "#" : `/leaders?page=${page - 1}`}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            text="Наступна"
            href={
              page === totalPages
                ? `#`
                : `/leaders?page=${page + 1}`
            }
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
