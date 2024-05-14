import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type SearchProps = {
  currentSearch: string
  onSearch: (search: string) => void
}

const formSchema = z.object({
  search: z.string(),
})

export const BrowseSearch = ({ onSearch, currentSearch }: SearchProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: currentSearch,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.search)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full'>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem className='w-3/4'>
              <FormControl>
                <Input placeholder='Search...' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='ml-1' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
