<template>
  <div>
    <form @submit.prevent="handleData">
      <div class="form">
        <div class="p-3">
          <label for="email" class="">Email:</label>
          <input v-model="email" id="email" type="text" class="form-control" placeholder="email">
        </div>
        <div class="p-3">
          <label for="password" class="">Password</label>
          <input v-model="password" id="password" type="password" class="form-control" placeholder="password">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 rounded justify-content-center mb-3">
          <button class="w-100 btn btn-primary" type="submit">Login</button>
        </div>
      </div>
    </form>
    <div id="login-link" class="text-center mt-3">
      Didn't have an account? <a href="#" @click="() => this.$router.push('/register')">Register here</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleData () {
      this.$store.dispatch('handleLogin', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>
