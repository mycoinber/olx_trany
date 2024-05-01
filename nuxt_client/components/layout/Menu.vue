<script lang="ts" setup>
import {MENU_DATA}  from './menu.data'
</script>

<template>
    <nav class="navigation">
        <NuxtLink v-for="item in MENU_DATA" :key="item.name" :to="item.url">
            <Icon :name="item.icon"><span>{{ item.name }}</span></Icon>
        </NuxtLink>
    </nav>
</template>

<style>
.navigation{
    display: flex;
    gap: 1.778rem;
    a{
       text-transform: uppercase; 
       font-weight: 530;
       line-height: 0.933rem;
       font-size: 0.778rem
    }
}
</style>