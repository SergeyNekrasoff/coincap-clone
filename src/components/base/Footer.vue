<template functional>
    <a-col class="footer">
        <a-row justify="space-between">
            <a-col :xl="8" :lg="4" :md="6" :sm="6">
                <span class="copy">© {{ props.year }} Coincap Clone. All rights reserved</span>
            </a-col>
            <a-col :xl="8" :lg="16" :md="12" :sm="12">
                <div class="policy">
                    <a href="/" class="link-default">Правила использования</a>
                    <a href="/" class="link-default">Политика конфеденциальности</a>
                </div>
            </a-col>
            <a-col :xl="8" :lg="4" :md="6" :sm="6">
                <div class="company">
                    <span>Сделано в <a href="/" class="link-default">{{ props.company }}</a></span>
                </div>
            </a-col>
        </a-row>
    </a-col>
</template>

<style lang="scss" scoped>
.footer {
    padding: 16px 0;
    
    .policy {
        text-align: center;
        
        .link-default {
            margin: 0 12px
        }
    }
    .company {
        text-align: right;
    }
}
</style>