import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type TNavigateProps = {
  page: number;
  pagesCount: number;
};

export const LeadersPagesNavigation = ({
  navigationProps,
}: {
  navigationProps: TNavigateProps;
}) => {

  return (
    <>
      <Pagination>
        <PaginationContent>
          {navigationProps.page !== 1 && (
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
          )}



          {navigationProps.page !== navigationProps.pagesCount && (
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
