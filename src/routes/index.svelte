<script lang="ts">
  import { session } from "$app/stores";
</script>

<svelte:head>
  <title>Constellation ★</title>
</svelte:head>

<main class="hero container mx-auto p-4">
  <article class="hero-content text-center flex-col lg:flex-row-reverse prose lg:prose-xl">
    <i class="fa-solid fa-star fa-10x text-yellow-400 rotate-12" />
    <div>
      {#if $session.user}
        <h1>
          Welcome to Constellation, {$session.user.name}
        </h1>
      {:else}
        <h1>Welcome to Constellation</h1>
      {/if}
      <p>
        This is a simple forum <a href="https://github.com/maxime-huyghe">I</a>'m building to test
        out this tech stack to, maybe, do some freelance development when I feel like it.
      </p>
      <a href="/topics" class="text-xl text-yellow-600">Navigate to the topic list</a>
    </div>
  </article>
</main>
