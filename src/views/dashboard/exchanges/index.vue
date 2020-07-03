<template>
    <div>
        <table class="table">
            <thead>
                <tr class="table__row table__row--head">
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'rank' }]" 
                        @click="sortBy('rank')">
                        <b>Rank</b>
                    </td>
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'name' }]" 
                        @click="sortBy('name')">
                        <b>Name</b>
                    </td>
                    <td class="td"><b>Trading Pairs</b></td>
                    <td class="td"><b>Volume (24Hr)</b></td>
                    <td 
                        :class="['td td--sort', { 'active': sortKey === 'percentTotalVolume' }]" 
                        @click="sortBy('percentTotalVolume')">
                        <b>Total (%)</b>
                    </td>
                    <td class="td"><b>Charts</b></td>
                    <td class="td"><b>Markets</b></td>
                    <td class="td"><b>Status</b></td>
                </tr>    
            </thead>
            <tbody>
                <tr
                    class="table__row"
                    v-for="row in readyList"
                    :key="row.exchangeId">
                    <td class="td td--center">{{ row.rank }}</td>
                    <td class="td td--center">{{ row.name }}</td>
                    <td class="td td--center">{{ row.tradingPairs }}</td>
                    <td class="td td--center">{{ roundToTwo(row.volumeUsd) || 0 }}</td>
                    <td class="td td--center">{{ roundToTwo(row.percentTotalVolume) || 0 }}</td>
                    <td class="td td--center">
                        <router-link class="link-default link-btn" :to="{ name: 'exchangeId', params: { id: row.exchangeId } }">
                            Ref
                        </router-link>
                    </td>
                    <td class="td td--center">
                        <router-link class="link-default link-btn" :to="{ name: 'marketsEx', params: { id: row.exchangeId } }">
                            Open
                        </router-link>
                    </td>
                    <td class="td td--center">
                        <span :class="['status', { 'status--active': row.socket }]"></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <button 
            class="btn-default btn-more" 
            @click="loadMore()"
            :disabled="uploaded">
            Load more...
        </button>
        {{ sortKey }}
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
        ...mapActions('exchanges', ['getExchanges']),
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
            if (value >= this.exchanges.length) {
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
            exchanges: 'exchanges/getExchanges'
        }),
        readyList() {
            const index = this.currentPage * this.rowsLength - this.rowsLength

            if (this.sortKey === null) {
                return this.exchanges.slice(index, index + this.rowsLength)
            }

            return this.exchanges.slice().sort((a, b) => {
                if (typeof a[this.sortKey] === 'string' && this.sortKey !== 'rank') {
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
        this.getExchanges()
    }
}
</script>