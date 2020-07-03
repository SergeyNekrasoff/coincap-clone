<template>
    <div class="exchange">
        <div v-if="typeof exchange === 'object' && exchange !== null && Object.keys(exchange).length">
            <a-row align="middle" justify="space-around">
                <a-col :span="12" v-if="typeof currentMarket !== 'undefined'">
                    <charts :market="currentMarket" />
                </a-col>
                <a-col :span="12">
                    <div class="exchange__detail">
                        <h1 class="title">{{ exchange.name }}</h1>
                        <ul class="exchange__detail-list">
                            <li><b>Total  Volume(%):</b> {{ roundToTwo(exchange.percentTotalVolume) }}</li>
                            <li><b>Usd Volume:</b> ${{ roundToTwo(exchange.volumeUsd) }}</li>
                            <li><b>Website: </b> 
                                <a :href="exchange.exchangeUrl" target="_blank">{{ exchange.exchangeUrl }}</a>
                            </li>
                        </ul>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { roundToTwo } from '@/helpers/utils'
const charts = () => import('@/components/Charts') 

export default {
    components: { charts },
    data() {
        return { 
            test: null
        }
    },
    methods: {
        ...mapActions({
            getExchange: 'exchanges/getExchange',
            getMarkets: 'markets/getMarkets',
        }),
        roundToTwo
    },
    computed: {
        ...mapGetters({
            exchange: 'exchanges/getExchange',
            market: 'markets/getMarket'
        }),
        currentMarket() {
            return this.market(this.$route.params.id)
        }
    },
    mounted() {
        this.getExchange(this.$route.params.id)
        this.getMarkets()
    }
}
</script>

<style lang="scss" scoped>
.exchange {
    padding-top: 40px;

    &__detail {
        padding: 0 0 0 40px;
    }

    .title {
        font-size: 36px;
    }
}
</style>