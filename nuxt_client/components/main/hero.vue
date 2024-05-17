<template>
  <section class="hero">
   <div class="container">
   <div class="hero-wrapper">
    <OfferCard :type="'type1'" :data="OFFER_DATA[0]" />
    <div class="hero-wrapper__small">
      <OfferCard :type="'type2'" :data="OFFER_DATA[1]" />
    <OfferCard :type="'type2'" :data="OFFER_DATA[2]" />
    </div>
   </div>
   </div>
  </section>
</template>

<script setup lang="ts">


const OFFER_DATA: Offer[] = [
    {
      title: "LOREM LOREM TEEST",
      _id: "1",
      image: "https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/1696691175374-MJY4VWB1KS8NU3DE3JK1/Sounds-of-Nature.jpg",
      price: "100",
      location: "Kyiv",
      date: "3 days ago", 
      square: "60"
    },
    {
        title: "test2",
        _id: "2",
        image: "https://static-cse.canva.com/blob/846900/photo1502082553048f009c37129b9e1583341920812.jpeg",
      price: "100",
      location: "Dnipro",
      date: "3 days ago", 
     square: "30"
      },{
        title: "price2",
        _id: "3",
        image: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg",
      price: "100",
      location: "Odesa",
      date: "3 days ago", 
     square: "30"
      },
  ];
</script>

<style lang="scss">
.hero {
  padding-top: 3.333rem;
margin-bottom: 7.222rem;
    &-wrapper{
      display: grid;
  grid-template-columns: 50% 1fr; 
gap: 0.889rem;

&__small{
  display: flex;
  flex-direction: column;
  gap: 0.889rem;
}
    }
}
</style>
