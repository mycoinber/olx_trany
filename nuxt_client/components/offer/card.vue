//card.vue
<template>
  <a :class="['card', `card--${type}`]" href="#">
    <div class="card-image">
      <img :src="data.image" alt="Card Image" />
    </div>
    <div class="card-details">
      <div class="card-details__top">
      <h2 class="card-details__title">{{ data.title }}</h2>
      <p class="card-details__price">{{ data.price }}</p>
      </div>
     <div class="card-details__bottom">
      <div class="card-details__inner">
      <span>{{ data.location }}</span>
      <span>{{ data.date }}</span>
      </div>
      <span class="card-square">{{ data.square }}</span>
     </div>
    </div>
  </a>
</template>

<script setup lang="ts">
interface Offer {
  title: string;
  _id: string;
  image: string;
  price: string;
  location: string;
  date: string;
  square: string;
}

const props = defineProps<{
  type: string;
  data: Offer;
}>();

const { type, data } = props;
</script>

<style lang="scss">
.card {
 background: #FFFFFF;
 border-radius: 0.6rem;

 img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
&-square{
  display: flex;
    gap: 0.222rem;
    align-items: center;

  &::before{
    content: '';
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 0.611rem;
    height: 0.6rem;
    display: block;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' fill='none'%3E%3Cpath stroke='%238A7D80' d='M3 12H1V7m5 5h6v-2M1 7V1h11v3M1 7h4V5v4m2-5h5m0 0v6m0 0H8'/%3E%3C/svg%3E");
  }
}
&-details {
  padding: 0.889rem;
  &__bottom{
   span{
    font-weight: 500;
   font-size: 0.778rem;
    line-height: 0.933rem;
    color: #8A7D80;
   }
  }
&__inner{
  display: flex;
  gap: 0.4rem;
}
  &__title {
  font-size: 1.333rem;
  font-weight: 500;
  line-height: 1.6rem;
  color: #141414;
}
&__price{
  font-size: 1.333rem;
  font-weight: 500;
  line-height: 1.6rem;
  color: #141414;
}
}
}

.card--type1{
  .card-image{
      width: 100%;
      height: 24.111rem;

      img{
        border-radius: 0.6rem 0.6rem 0 0 ;
        height: 100%;
      }
    }
    .card-details{
      display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1.778rem;
    &__top{
      display: flex;
 justify-content: space-between;
 align-items: center;
      margin-bottom: 1.778rem;
    }
    }
     
  }

  .card--type2{
    height: 16.056rem;
    display: flex;
    gap:0.889rem;

    .card-image{
      width: 16.056rem;
      height: 16.056rem;
      img{
        border-radius: 0.6rem 0 0 0.6rem ;
      }
    }
    .card-details{
      display: flex;
    justify-content: space-between;
    flex-direction: column;
      &__title{
        margin-bottom: 0.889rem;
      }
      
    }
  }
  .card--type3{
    border-radius: 0.6rem;
    max-width: 30.611rem;
    width: 100%;
   
    .card-image{
      width: 100%;
      height: 21.056rem;

      img{
        border-radius: 0.6rem 0.6rem 0 0 ;
        height: 100%;
      }
    }
    .card-details{
      background: #FFFFFF;
      display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0 0 0.6rem 0.6rem ;
    gap: 2.222rem;
      &__title{
        margin-bottom: 0.889rem;
      }
    }
  }
</style>

