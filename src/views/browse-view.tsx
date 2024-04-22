import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import useFavoritesStore from '@/stores/favorited-store'

const symbols = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT', 'PLTR']
const names = ['Apple Inc.', 'Alphabet Inc. Class A Common Stock', 'Tesla, Inc. Common Stock', 'Amazon.Com Inc', 'Microsoft Corp', 'Palantir Technologies Inc. Class A Common Stock']

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
  const symbol = symbols[i];
  const { toggleFavorite, isFavorited } = useFavoritesStore((state) => ({
    toggleFavorite: state.toggleFavorite,
    isFavorited: state.isFavorited(symbol),
  }))
  return (
    <Card>
      <CardHeader className='flex justify-between items-center'>
        <div className='flex-grow'>
          <CardTitle>{`News Item ${i + 1}: ${symbols[i]}`}</CardTitle>
        </div>
      <CardFavorite favorited={isFavorited} onClick={() => toggleFavorite(symbols[i], names[i])} aria-label='Favorite Toggler' />
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Link to='/details/$symbol' params={{ symbol: symbols[i] }}>
          <Button variant='ghost'>{`View Company Profile for ${symbols[i]}`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
