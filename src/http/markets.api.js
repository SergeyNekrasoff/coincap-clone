import { httpClient } from './index'

const path = 'markets'

const getMarkets = () => httpClient.get(`${path}`)

export {
    getMarkets
}