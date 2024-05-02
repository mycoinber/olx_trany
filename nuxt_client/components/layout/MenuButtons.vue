<script lang="ts" setup>
import {MENU_BUTTONS_DATA}  from './menubuttons.data'
</script>

<template>
  <nav class="panel__nav">
     <NuxtLink v-for="item in MENU_BUTTONS_DATA" :key="item.name" :to="item.url">
            <Icon :name="item.icon"><span>{{ item.name }}</span></Icon>
        </NuxtLink>
  </nav>
</template>


 
<style scoped>
  .panel__nav {
      display: flex; 
       a{
        border-left: 0.028rem solid #8A7D80;
        padding: 1rem;
        transition: 0.4s;
       }

      a:last-child{
         font-size: 0.778rem;
    line-height: 0.933rem;
    font-weight: 500;
    background: #981E32;
    color: #ffffff;
    padding: 0.889rem 1.583rem;
    text-transform: uppercase;
    display: flex;
        align-items: center;

    span{
    font-size: 0.778rem;
    line-height: 0.933rem;
    font-weight: 500;
    color: #ffffff;
    }
      }
  }

</style>
