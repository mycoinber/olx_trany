<template>
    <section class="sale">
     <div class="container">
        <h2 class="sale-title">Top for Sale</h2>
     <div class="sale-wrapper">
      <OfferCard :type="'type3'" :data="OFFER_DATA[0]" />
        <OfferCard :type="'type3'" :data="OFFER_DATA[1]" />
      <OfferCard :type="'type3'" :data="OFFER_DATA[2]" />
     </div>
     <button class="sale-button">See more</button>
     </div>
    </section>
  </template>
  
  <script setup lang="ts">
  
  
  const OFFER_DATA: Offer[] = [
      {
        title: "SHARK ROCKER",
        _id: "1",
        image: "https://focus.ua/static/storage/thumbs/920x465/4/5e/bc0a65ee-45612a2a2f58a1de340f5ba4ffc985e4.jpg?v=2045_1",
        price: "1488 uh",
        location: "Somewhere",
        date: "13 days ago", 
        square: "630"
      },
      {
          title: "SHARK SMILES",
          _id: "2",
          image: "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
        price: "13200",
        location: "TEST-location",
        date: "2 years ago", 
       square: "32"
        },{
          title: "SHARK AGRESSOR",
          _id: "3",
          image: "https://s0.rbk.ru/v6_top_pics/media/img/6/16/346898632338166.webp",
        price: "1703 $",
        location: "Odesa",
        date: "2 days ago", 
       square: "32"
        },
    ];
  </script>
  
  <style lang="scss">
  .sale {
    background:  #FFFFFF;
padding: 6.667rem 0;
border-top:0.056rem solid #981E32;
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
   .card-details{
    background: #F4F4F4;
   }
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
  