<template>
    <div class="">
        <a-layout>
            <a-row align="middle" justify="space-around">
                <cHeader />

                <div class="dashboard">
                    <router-view/>
                </div>
            
                <fc-footer v-bind="{ year: new Date().getFullYear(), company: 'Default' }"></fc-footer>
            </a-row>
        </a-layout>
    </div>
</template>

<script>
const cHeader = () => import('@/components/base/Header')
const fcFooter = () => import('@/components/base/Footer')

export default {
    components: { 
        cHeader,
        fcFooter
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    min-height: calc(100vh - 180px);
}
</style>