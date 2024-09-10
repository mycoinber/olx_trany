<template>
  <section class="about">
    <div class="about-wrapper">
      <div class="about-top">
        <NuxtLink to="/" class="about-logo">
          <NuxtImg src="/LOGO-white.svg" alt="logo" />
        </NuxtLink>
        <h2 class="about-title">About Company</h2>
        <p class="about-desc">
          All online advertisements of Ukraine on OLX - here you will find what
          you were looking for! By clicking on the "Publish an ad" button, you
          can place an ad on any topic easily and quickly. Using the OLX
          service, you can buy or sell almost anything from hand to hand. OLX.ua
          communities on social networks:
        </p>
        <div class="about-socaial">
          <NuxtLink
            to="https://www.facebook.com"
            target="_blank"
            class="about-socaial__icon"
          >
            <NuxtImg src="/Facebook.svg" alt="Facebook" />
          </NuxtLink>
          <NuxtLink
            to="https://www.twitter.com"
            target="_blank"
            class="about-socaial__icon"
          >
            <NuxtImg src="/Telegram.svg" alt="Twitter" />
          </NuxtLink>
          <NuxtLink
            to="https://www.instagram.com"
            target="_blank"
            class="about-socaial__icon"
          >
            <NuxtImg src="/Instagram.svg" alt="Instagram" />
          </NuxtLink>
        </div>
      </div>
      <div class="about-bottom">
        <div class="about-bottom__left">
          <h2 class="about-bottom__title">Don't miss a thing</h2>
          <p class="about-bottom__desc">
            Subscribe to the newsletter to stay up to date with discounts and
            major new products.
          </p>
          <form class="about-subscribe">
            <input
              type="email"
              id="email"
              class="about-subscribe__input"
              placeholder="Your email"
              required
            />
            <button type="submit" class="about-subscribe__button">Send</button>
          </form>
        </div>
        <div class="about-bottom__right">
          <NuxtImg src="http://localhost:3000/Rectangle.png" alt="big_photo" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  let email = "";
</script>

<style lang="scss">
  .about {
    padding: 6.667rem 0 0 0;
    background: #981e32;

    &-subscribe {
      flex-direction: row;
      background: none;
      gap: 0;
      padding: 0;
      margin: 0 auto;
      justify-content: center;

      &__input {
        background: #f4f4f452;
        font-weight: 500;
        padding: 0.889rem;
        width: 17.444rem;
        color: #ffffff !important;
        border-radius: 0.278rem 0 0 0.278rem;
        margin: 0;
        font-size: 0.778rem;

        &::placeholder {
          color: #ffffff !important;
        }
      }

      &__button {
        background: #f4f4f4;
        padding: 0.889rem 1.778rem;
        width: 23%;
        color: #981e32;
        font-weight: 500;
        border-radius: 0 0.278rem 0.278rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: 0.3s ease;

        &::after {
          content: "";
          transition: 0.3s ease;
          display: block;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='11' fill='none'%3E%3Cpath stroke='%23981E32' d='m7 10.5 5-5m0 0-5-5m5 5H0'/%3E%3C/svg%3E");
          width: 0.6rem;
          height: 0.6rem;
        }

        &:hover {
          background: #f4f4f4;
          &::after {
            content: "";
            transform: translateX(0.2rem);
          }
        }
      }
    }

    &-top {
      margin-bottom: 6.667rem;
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      gap: 6rem;

      &__title {
        align-items: center;
        font-weight: 500;
        color: #ffffff;
        font-size: 2.444rem;
        text-align: center;
        margin-bottom: 1.778rem;
        line-height: 2.933rem;
      }
      &__desc {
        font-size: 1rem;
        font-weight: 500;
        max-width: 37rem;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 1.333rem;
        text-align: center;
        color: #ffffff;
      }
      &__left {
        padding: 3rem 0rem 2rem 8rem;
        max-width: 50%;
        width: 100%;
      }
      &__right {
        width: 50%;
        height: 41.333rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &-logo {
      width: 5.556rem;
      height: 1.278rem;
      display: block;
      margin: 0 auto;
      margin-bottom: 2.222rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-title {
      font-weight: 500;
      color: #ffffff;
      font-size: 2.444rem;
      text-align: center;
      margin-bottom: 1.778rem;
      line-height: 2.933rem;
    }

    &-desc {
      font-size: 1rem;
      font-weight: 500;
      max-width: 37.333rem;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1.333rem;
      text-align: center;
      color: #ffffff;
    }

    &-socaial {
      display: flex;
      gap: 0.444rem;
      align-items: center;
      justify-content: center;

      &__icon {
        width: 0.944rem;
        height: 0.944rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 30rem;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background: #ffffff;

    input {
      padding: 0.75rem;
      margin-bottom: 0.889rem;
      border: none;
      background: #f4f4f4;
      border-radius: 0.25rem;
      transition: border-color 0.3s ease-in-out;
      outline: none;
      color: #141414;
      font-size: 0.778rem;
      line-height: 0.933rem;
      font-weight: 500;
      font-family: "Montserrat", sans-serif;

      &::placeholder {
        color: #141414;
        text-transform: uppercase;
        font-size: 0.778rem;
        line-height: 0.933rem;
        font-weight: 500;
        font-family: "Montserrat", sans-serif;
      }

      &:focus {
        border-color: #555;
      }
    }

    button {
      text-transform: uppercase;
      width: 100%;
      background-color: #981e32;
      color: #ffffff;
      padding: 0.889rem;
      border: none;
      border-radius: 0.278rem;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      font-size: 0.778rem;
      font-weight: 500;
      line-height: 0.933rem;
      font-family: "Montserrat", sans-serif;

      &:hover {
        background-color: #333;
      }
    }

    .button__group {
      display: flex;
      gap: 0.444rem;
      width: 100%;
      justify-content: space-between;
      flex-direction: column;

      &-send {
        display: flex;
        gap: 0.556rem;
        align-items: center;
        justify-content: center;

        &::after {
          transition: transform 0.3s ease;
          content: "";
          display: inline-block;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' fill='none'%3E%3Cpath stroke='%23fff' d='m7.5 10.5 5-5m0 0-5-5m5 5H.5'/%3E%3C/svg%3E");
          width: 0.473rem;
          height: 0.472rem;
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
  }
</style>
