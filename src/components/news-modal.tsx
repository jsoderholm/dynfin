import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { CombinedInfo } from '@/lib/api/stock-news'

interface NewsModalProps {
  news: CombinedInfo
}

const NewsModal: React.FC<NewsModalProps> = ({ news }) => {
  const isNewsInfo = news.dataType === 'news'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Read more</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{isNewsInfo ? news.title : news.headline}</DialogTitle>
        {isNewsInfo && <img src={news.image_url} alt='News related visual' />}
        <p>{news.text}</p>
        {isNewsInfo && (
          <p>
            <strong>Source:</strong> {news.source_name}
          </p>
        )}
        <p>
          <strong>Date:</strong> {news.date.toString()}
        </p>
        {isNewsInfo && (
          <p>
            <strong>Topics:</strong> {news.topics.join(', ')}
          </p>
        )}
        <div style={{ marginTop: '10px' }}>
          <strong>Tickers: </strong>
          {news.tickers.map((ticker) => (
            <Link to='/details/$symbol' params={{ symbol: ticker }} className='badge'>
              {ticker}
            </Link>
          ))}
        </div>
        {isNewsInfo && (
          <a href={news.news_url} target='_blank' rel='noopener noreferrer'>
            Read Full Article
          </a>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NewsModal
