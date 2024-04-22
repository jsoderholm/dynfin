import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import useFavoritesStore from '@/stores/favorited-store'

const companies = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'PLTR', name: 'Palantir Technologies' },
]

function BrowseView() {
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <BrowseItem key={i} i={i} />
        ))}
      </div>
    </div>
  )
}

interface BrowseItemProps {
  i: number
}

const BrowseItem = ({ i }: BrowseItemProps) => {
  const company = companies[i]

  const { toggleFavorite, isFavorited } = useFavoritesStore((state) => ({
    toggleFavorite: state.toggleFavorite,
    isFavorited: state.isFavorited(company.symbol),
  }))

  return (
    <Card>
      <CardHeader className='flex justify-between items-center'>
        <div className='flex-grow'>
          <CardTitle>{`News Item ${i + 1}: ${company.name}`}</CardTitle>
        </div>
        <CardFavorite
          favorited={isFavorited}
          onClick={() => toggleFavorite(company.symbol, company.name)}
          aria-label='Favorite Toggler'
        />
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Link to='/details/${company.symbol}' params={{ symbol: company.symbol }}>
          <Button variant='ghost'>{`View Company Profile for ${company.name}`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
