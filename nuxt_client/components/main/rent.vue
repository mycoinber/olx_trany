<template>
    <section class="rent">
     <div class="container">
        <h2 class="rent-title">Top to Rent</h2>
     <div class="rent-wrapper">
      <OfferCard :type="'type3'" :data="OFFER_DATA[0]" />
        <OfferCard :type="'type3'" :data="OFFER_DATA[1]" />
      <OfferCard :type="'type3'" :data="OFFER_DATA[2]" />
     </div>
     <button class="rent-button">See more</button>
     </div>
    </section>
  </template>
  
  <script setup lang="ts">
  
  
  const OFFER_DATA: Offer[] = [
      {
        title: "LOREM LOREM TEEST",
        _id: "1",
        image: "https://web-zoopark.ru/wp-content/uploads/2018/07/1-162.jpg",
        price: "100",
        location: "Kyiv",
        date: "3 days ago", 
        square: "60"
      },
      {
          title: "test2",
          _id: "2",
          image: "https://c72267e4.rocketcdn.me/wp-content/uploads/2022/10/855cafcf-3361-43be-928c-4ff53736eeae.jpg",
        price: "100",
        location: "Dnipro",
        date: "14 days ago", 
       square: "880"
        },{
          title: "price2",
          _id: "3",
          image: "https://national-travel.ru/wp-content/uploads/wtt-images/2019/01/1c442c9e06817b6b4483c5cc2b21aa70-1.jpg",
        price: "100",
        location: "Odesa",
        date: "3 days ago", 
       square: "30"
        },
    ];
  </script>
  
  <style lang="scss">
  .rent {
    &-title{
        text-align: center;
margin-bottom: 2.222rem;
color: #141414;
line-height: 2.933rem;
font-weight: 500;
font-size: 2.444rem;
    }
      &-wrapper{
     display: flex;
  gap: 0.889rem;
   align-items: center;
   justify-content: center;
   margin-bottom: 2.222rem;
      }
      &-button{
        text-transform: uppercase;
        color: #FFFFFF;
        font-weight: 500;
        font-size: 0.778rem;
        line-height: 0.933rem;
        border: none;
        outline: none;
        padding: 0.889rem 1.806rem;
        background: #981E32;
        border-radius: 0.278rem;
        cursor: pointer;
        margin: 0 auto;
        display: flex;
        gap: 0.4rem;
        align-items: center;
        margin-bottom: 5.667rem;

        &::after {
        transition: transform 0.3s ease;
        content: '';
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' fill='none'%3E%3Cpath stroke='%23fff' d='m7.5 10.5 5-5m0 0-5-5m5 5H.5'/%3E%3C/svg%3E");
        width: 0.9rem;
        height: 0.6rem;

      }

      &:hover::after {
        transform: translateX(0.2rem);
        -webkit-transform: translateX(0.2rem);
        -moz-transform: translateX(0.2rem);
        -ms-transform: translateX(0.2rem);
        -o-transform: translateX(0.2rem);
      }
    
      }
  }
  </style>
  