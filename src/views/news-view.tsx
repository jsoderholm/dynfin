import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function NewsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News Item</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </CardContent>
    </Card>
  )
}

export default NewsView
