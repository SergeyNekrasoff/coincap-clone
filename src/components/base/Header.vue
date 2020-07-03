<template>
    <a-col class="header">
        <a-row align="middle" justify="space-between">
            <a-col :span="11">
                <router-link class="link-default" to="/">Exchanges</router-link>
                <router-link class="link-default" to="/markets">Markets</router-link>
            </a-col>
            <a-col :span="13">
                <app-logo style="width: 80px; height: 80px;" />
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
const appLogo = () => import('@/components/base/AppLogo')

export default {
    components: { appLogo }
}
</script>

<style lang="scss" scoped>
.header {
    border-bottom: 1px solid #e2e2e2;

    .link-default {
        height: 85px;
        line-height: 85px;

        &:first-child {
            margin-right: 16px;
        }

        &:hover {
            color: #000;
        }
    }
}
</style>