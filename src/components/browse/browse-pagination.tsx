import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationProps } from '@/views/browse-view'

export const PaginationNumbers = ({ currentPage, onPageChange, maxPages }: PaginationProps) => {
  if (maxPages === undefined) {
    return
  }

  return (
    <PaginationContent>
      {/* Show previous button if we are not on page 1 (i.e. there is a page to go back to) */}
      {currentPage > 1 && (
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
        </PaginationItem>
      )}

      <PaginationItem>
        <PaginationLink isActive={true}>{currentPage}</PaginationLink>
      </PaginationItem>

      {currentPage < maxPages && (
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      )}
    </PaginationContent>
  )
}
