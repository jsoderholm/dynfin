import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { NewsInfo } from '@/lib/api/stock-news'

interface NewsModalProps {
  news: NewsInfo
}

const NewsModal: React.FC<NewsModalProps> = ({ news }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Read more</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{news.title}</DialogTitle>
        <img src={news.image_url} alt='News related visual' />
        <p>{news.text}</p>
        <p>
          <strong>Source:</strong> {news.source_name}
        </p>
        <p>
          <strong>Date:</strong> {news.date.toString()}
        </p>
        <p>
          <strong>Topics:</strong> {news.topics.join(', ')}
        </p>
        <div style={{ marginTop: '10px' }}>
          <strong>Tickers:</strong>
          {news.tickers.map((ticker, index) => (
            <Link key={index} to={`/details/${ticker}`} className='badge'>
              {ticker}
            </Link>
          ))}
        </div>
        <a href={news.news_url} target='_blank' rel='noopener noreferrer'>
          Read Full Article
        </a>
      </DialogContent>
    </Dialog>
  )
}

export default NewsModal
