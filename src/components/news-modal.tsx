import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { CombinedInfo } from '@/lib/api/stock-news'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface NewsModalProps {
  news: CombinedInfo
}

const NewsModal: React.FC<NewsModalProps> = ({ news }) => {
  const isNewsInfo = news.dataType === 'news'
  const date = new Date(news.date).toLocaleDateString('en-US')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full'>Read more</Button>
      </DialogTrigger>
      <DialogContent>
        <div className='flex flex-col gap-y-2'>
          <div className='flex text-sm text-muted-foreground'>
            {isNewsInfo && <p>{news.source_name}&nbsp;⋅&nbsp;</p>}
            <span>{date}&nbsp;</span>
            {isNewsInfo && news.topics.length > 0 && (
              <span>⋅&nbsp;{news.topics.map((topic) => topic[0].toUpperCase() + topic.slice(1)).join(', ')}</span>
            )}
          </div>
          <DialogTitle>{isNewsInfo ? news.title : news.headline}</DialogTitle>
        </div>
        {isNewsInfo && <img src={news.image_url} className='h-[259.88px]' alt='News related visual' />}
        <p className='text-muted-foreground'>{news.text}</p>
        <div className='grid grid-cols-4 gap-x-4'>
          {news.tickers.map((ticker) => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link to='/details/$symbol' params={{ symbol: ticker }}>
                    <Badge variant='secondary' className='flex justify-center'>
                      {ticker}
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Company Profile for {ticker}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        {isNewsInfo && (
          <Button>
            <a href={news.news_url} target='_blank' rel='noopener noreferrer'>
              Read full article
            </a>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NewsModal
