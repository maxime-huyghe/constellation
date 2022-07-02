<script lang="ts">
  import { page } from "$app/stores";

  export let error: string = "";
</script>

<main class="container mx-auto p-4">
  <form class="card shadow-md rounded-none w-96 mx-auto" method="post" href={$page.url.toString()}>
    <div class="card-body">
      <div class="card-title">
        <h2>Log In</h2>
      </div>
      <label class="form-control">
        <span class="label label-text">Username</span>
        <input class="input input-bordered" name="username" type="text" required />
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
      TODO: signup link
    </div>
  </form>
</main>
