interface InfoViewProps {
  symbol: string | null
}

function InfoView({ symbol }: InfoViewProps) {
  return <div>Hello InfoView! From symbol {symbol}</div>
}

export default InfoView
