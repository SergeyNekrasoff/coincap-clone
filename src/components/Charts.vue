<template>
    <div>
        <apexchart type="candlestick" height="350" :options="chartOptions" :series="formatCandles"></apexchart>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { roundToTwo } from '@/helpers/utils'

export default {
    props: { 
        market: { 
            type: Object,
            default: () => ({}), 
            required: true
        }
    },
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: `${this.market.exchangeId} Chart`,
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            candles: 'exchanges/getCandles'
        }),
        formatCandles() {
            const data = this.candles.map(e => {
                const open = this.roundToTwo(e.open)
                const high = this.roundToTwo(e.high)
                const low = this.roundToTwo(e.low)
                const close = this.roundToTwo(e.close)

                return {
                    x: e.period,
                    y: [open, low, high, close]
                }
            })

            return [{ name: 'candle', data: data }]
        }
    },
    methods: {
        ...mapActions({
            getCandles: 'exchanges/getCandles'
        }),
        roundToTwo
    },
    mounted() {
        this.getCandles({
            exchange: this.market.exchangeId,
            interval: 'h8',
            baseId: this.market.baseId,
            quoteId: this.market.quoteId
        })
    }
}
</script>