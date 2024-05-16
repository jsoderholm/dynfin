import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationProps } from '@/views/browse-view'

export const PaginationNumbers = ({ currentPage, onPageChange, maxPages }: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= maxPages) {
      onPageChange(newPage)
      window.scrollTo(0, 0)
    }
  }

  if (maxPages === undefined) {
    return
  }

  return (
    <PaginationContent>
      {/* Show previous button if we are not on page 1 (i.e. there is a page to go back to) */}
      {currentPage > 1 && (
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
      )}

      <PaginationItem>
        <PaginationLink isActive={true}>{currentPage}</PaginationLink>
      </PaginationItem>

      {currentPage < maxPages && (
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      )}
    </PaginationContent>
  )
}
