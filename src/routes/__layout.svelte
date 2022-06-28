<script>
  import "../app.css";
</script>

<nav class="navbar bg-base-100 flex justify-between">
  <div>
    <a href="/" class="btn btn-ghost normal-case text-3xl font-black">Constellation</a>
  </div>
  <a href="/login" class="btn btn-ghost gap-2">
    Log in
    <i class="fa-solid fa-right-to-bracket text-xl" />
  </a>
</nav>

<main class="container mx-auto p-4">
  <slot />
</main>
