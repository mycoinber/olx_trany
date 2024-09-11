<script lang="ts" setup></script>

<template>
  <header class="header">
    <div class="header__top">
      <span>
        Subscribe to the newsletter and receive <strong>BONUSES</strong>
      </span>
    </div>

    <div class="header__bottom">
      <div class="header__bottom-inner">
        <NuxtLink to="/" class="logo">
          <NuxtImg src="/logo.svg" alt="logo" />
        </NuxtLink>

        <!-- Поле поиска -->
        <div class="header__bottom-search">
          <div class="search-form">
            <div class="search-button">
              <Icon name="iconamoon:search-light" />
            </div>
            <input
              type="text"
              class="search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        <!-- Кнопка меню -->
        <div class="header__bottom-menu">
          <span class="menu-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="5" width="15" height="1.04255" fill="#141414" />
              <rect
                x="1"
                y="10.9575"
                width="15"
                height="1.04255"
                fill="#141414"
              />
            </svg>
          </span>
          <span class="menu-text">MENU</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    background: #ffffff;
    // box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.1);

    &__top {
      background: #141414;
      padding: 0.429rem 0;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.857rem;
        font-weight: 500;
        line-height: 1.029rem;
        color: #ffffff;

        strong {
          color: #ffb612;
          display: flex;
          align-items: center;
          margin-left: 0.286rem;

          &:after {
            content: "";
            width: 0.357rem;
            height: 0.357rem;
            padding: 0.05rem;
            display: inline-block;
            background: #ffb612;
            border-radius: 50%;
            margin-left: 0.286rem;
          }
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;

      &-inner {
        display: flex;
        padding: 1.143rem;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .logo {
        display: block;
        width: 5.571rem;
        height: 1.114rem;
        img {
          display: inline-flex;
          object-fit: cover;
          justify-content: center;
          align-items: center;
        }
      }

      .header__bottom-search {
        display: flex;
        align-items: center;
        width: 12rem;

        .search-form {
          display: flex;
          align-items: center;
          background-color: #f7f7f7;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }

        .search-input {
          border: none;
          background: transparent;
          font-size: 1rem;
          padding-left: 1.786rem;
          outline: none;
          color: #ccc;

          &::placeholder {
            color: #ccc;
          }
        }

        .search-button {
          position: absolute;

          background: none;
          border: none;
          cursor: pointer;

          svg {
            width: 0.929rem;
            height: 0.929rem;
            display: inline-block;
            color: #000;
          }
        }
      }

      .header__bottom-menu {
        display: flex;
        align-items: center;
        cursor: pointer;

        .menu-icon {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 0.5rem;
          cursor: pointer;

          .menu-line {
            width: 2rem;
            height: 0.2rem;
            background-color: #000;
          }
        }

        .menu-text {
          font-size: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          color: #000;
        }
      }
    }
  }
</style>
