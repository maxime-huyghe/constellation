<script lang="ts">
  export let error: string = "";
  export let attemptedUsername: string = "";
</script>

<main class="container mx-auto p-4">
  <form class="card shadow-md rounded-none w-96 mx-auto" method="post">
    <div class="card-body">
      <div class="card-title">
        <h2>Log In</h2>
      </div>
      <label class="form-control">
        <span class="label label-text">Username</span>
        <input
          class="input input-bordered"
          name="username"
          type="text"
          required
          value={attemptedUsername}
        />
      </label>
      <label class="form-control">
        <span class="label label-text">Password</span>
        <input class="input input-bordered" name="password" type="password" required />
      </label>
      {#if error}
        <div class="text-error pl-1 mt-2">{error}</div>
      {/if}
      <div class="flex mt-6">
        <button type="submit" class="btn btn-primary w-full">Log in</button>
      </div>
      <div class="flex mt-4">
        <a href="/signup" class="btn btn-secondary w-full">No account? Sign up here!</a>
      </div>
    </div>
  </form>
</main>
