<script>
  import UserButton from "$lib/components/UserButton.svelte";
  import "../app.css";
</script>

<nav class="navbar bg-base-100 flex justify-between">
  <div>
    <a href="/" class="btn btn-ghost normal-case text-3xl font-black">Constellation</a>
  </div>
  <UserButton />
</nav>

<slot />
