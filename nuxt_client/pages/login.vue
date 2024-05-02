<script lang="ts" setup>
  console.log("login loaded");
  useSeoMeta({
    title: "Login",
  });
  definePageMeta({
    layout: "auth",
  });
  const authStore = useAuthStore();
  const router = useRouter();

  console.log(authStore.getIsAuthenticated);
  const username = ref("");
  const password = ref("");

  const handleLogin = async () => {
    const response = await authStore.login(username.value, password.value);
    if (response) {
      router.push("/");
    }
  };

  const handleRegister = () => {
    router.push("/registration");
  };
</script>

<template>
  <div class="auth auth--login">
    <div class="auth__form">
      <h1 class="auth__title">Sign In</h1>
      <span class="auth__subtitle">Please enter your details</span>
      <form @submit.prevent="handleLogin" class="form__login">
        <input
          type="text"
          v-model="username"
          placeholder="Your email"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Your Password"
          required
        />
        <div class="form__login-bottom">
          <div class="form__login-check">
            <input
              type="checkbox"
              id="subscribeNews"
              name="subscribe"
              value="newsletter"
            />
            <label for="subscribeNews">Remember me</label>
          </div>

          <div class="form__login-register">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div class="button__group">
          <button type="submit" class="button__group-send">Send</button>
          <button @click="handleRegister" class="registration">Register</button>
        </div>
        <button @click="handleRegister" id="registationButton">
          Don’t have an account? <strong>Sign Up</strong>
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .auth--login {
    .registration {
      background: #141414;
    }
    .form__login-check {
      display: flex;
    }

    .form__login-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: -1rem;

      label {
        font-family: $Montserrat;
        font-size: 0.778rem;
        line-height: 0.933rem;
        font-weight: 500;
        color: #8a7d80;
        cursor: pointer;
        margin-left: 0.278rem;
      }

      input {
        margin: 0;
      }
      a {
        font-family: $Montserrat;
        font-size: 0.778rem;
        line-height: 0.933rem;
        font-weight: 500;
        color: #8a7d80;
      }
    }
    #registationButton {
      background: none;
      font-size: 0.778rem;
      line-height: 0.933rem;
      font-weight: 500;
      color: #8a7d80;
      text-transform: none;
      strong {
        color: #981e32;
        text-decoration: underline;
      }
    }
  }
</style>
