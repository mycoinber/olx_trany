<script lang="ts" setup>
import {MENU_DATA}  from './menu.data'
</script>

<template>
    <aside>
        <NuxtLink v-for="item in MENU_DATA" :key="item.name" :to="item.url">
            <Icon :name="item.icon"><span>{{ item.name }}</span></Icon>
        </NuxtLink>
    </aside>
</template>

<style>

</style>