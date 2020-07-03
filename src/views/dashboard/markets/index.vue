<template>
    <div>
        <table class="table">
            <thead>
                <tr class="table__row table__row--head">
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'baseId' }]" 
                        @click="sortBy('baseId')">
                        <b>Name</b>
                    </td>
                    <td class="td"><b>Symbol</b></td>
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'exchangeId' }]" 
                        @click="sortBy('exchangeId')">
                        <b>Exchange Name</b>
                    </td>
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'percentExchangeVolume' }]" 
                        @click="sortBy('percentExchangeVolume')">
                        <b>Exchange Volume (%)</b>
                    </td>
                    <td class="td"><b>Price Quote</b></td>
                    <td class="td"><b>Price USD</b></td>
                    <td class="td"><b>Quote Name</b></td>
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'volumeUsd24Hr' }]" 
                        @click="sortBy('volumeUsd24Hr')">
                        <b>Volume (24Hr)</b>
                    </td>
                </tr>    
            </thead>
            <tbody>
                <tr
                    class="table__row"
                    v-for="(row, index) in readyList"
                    :key="index">
                    <td class="td td--center">{{ row.baseId }}</td>
                    <td class="td td--center">{{ row.baseSymbol }}</td>
                    <td class="td td--center">{{ row.exchangeId }}</td>
                    <td class="td td--center">{{ roundToTwo(row.percentExchangeVolume) || 0 }}</td>
                    <td class="td td--center">{{ roundToTwo(row.priceQuote) || 0 }}</td>
                    <td class="td td--center">{{ roundToTwo(row.priceUsd) || 0 }}</td>
                    <td class="td td--center">{{ row.quoteId }}</td>
                    <td class="td td--center">{{ roundToTwo(row.volumeUsd24Hr) || 0 }}</td>
                </tr>
            </tbody>
        </table>
        <button 
            class="btn-default btn-more" 
            @click="loadMore()"
            :disabled="uploaded">
            Load more...
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { roundToTwo } from '@/helpers/utils'

export default {
    data() {
        return {
            rowsLength: 10,
            currentPage: 1,
            uploaded: false,
            sortKey: null
        }
    },
    methods: {
        ...mapActions('markets', ['getMarkets']),
        loadMore() {
            this.rowsLength = this.rowsLength + this.rowsLength
        },
        sortBy(sortKey) {
            if (this.sortKey === sortKey) {
                this.sortKey = null
            } else {
                this.sortKey = sortKey
            }
        },
        roundToTwo
    },
    watch: {
        'rowsLength': function(value) {
            if (value >= this.markets.length) {
                this.uploaded = !this.uploaded
            }
        },
        'sortKey': function(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.currentPage = 1
            }
        }
    },
    computed: {
        ...mapGetters({
            markets: 'markets/getMarkets'
        }),
        readyList() {
            const index = this.currentPage * this.rowsLength - this.rowsLength

            if (this.sortKey === null) {
                return this.markets.slice(index, index + this.rowsLength)
            }

            return this.markets.slice().sort((a, b) => {
                if (typeof a[this.sortKey] === 'string' && 
                    (this.sortKey !== 'percentExchangeVolume' ||
                    this.sortKey !== 'volumeUsd24Hr')) {
                    return a[this.sortKey] > b[this.sortKey] ? 
                        1 : a[this.sortKey] < b[this.sortKey] ? 
                        -1 : 0
                } else {
                    const num1 = +a[this.sortKey] || 0
                    const num2 = +b[this.sortKey] || 0
                    return num2 - num1
                }
            }).slice(index, index + this.rowsLength)
        }
    },
    mounted() {
        this.getMarkets()
    }
}
</script>