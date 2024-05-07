import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationProps } from '@/views/browse-view'

type PaginationNumbersProps = Pick<PaginationProps, 'currentPage' | 'onPageChange'>

export const PaginationNumbers = ({ currentPage, onPageChange }: PaginationNumbersProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      onPageChange(newPage)
      window.scrollTo(0, 0)
    }
  }

  if (currentPage == 1) {
    return (
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    )
  } else if (currentPage < 3) {
    return (
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    )
  } else {
    return (
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(1)}>
            <PaginationEllipsis />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    )
  }
}
