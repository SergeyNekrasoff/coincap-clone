import { httpClient } from './index'

const exchangesPath = 'exchanges'
const candlesPath = 'candles'

const getExchanges = () => httpClient.get(`${exchangesPath}`)
const getExchange = (id) => httpClient.get(`${exchangesPath}/${id}`)
const getCandles = (data) => httpClient.get(`${candlesPath}?exchange=${data.exchange}&interval=${data.interval}&baseId=${data.baseId}&quoteId=${data.quoteId}`)

export {
    getExchanges,
    getExchange,
    getCandles
}