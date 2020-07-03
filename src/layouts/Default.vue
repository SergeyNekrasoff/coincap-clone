<template>
    <a-layout class="main">
        <a-layout-content class="content">
            <vue-page-transition name="fade-in-left">
                <!-- Sidebar -->
                <slot />
            </vue-page-transition>
        </a-layout-content>
    </a-layout>
</template>