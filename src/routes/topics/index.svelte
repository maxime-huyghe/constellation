<script lang="ts">
  import { session } from "$app/stores";
  import TopicForm from "$lib/components/TopicForm.svelte";
  import type { TopicWithAuthorName } from ".";

  export let topics: TopicWithAuthorName[];
</script>

<svelte:head>
  <title>Topic list ★</title>
</svelte:head>

<main class="container mx-auto p-4">
  {#if $session.user}
    <TopicForm />
  {/if}
  {#each topics as topic}
    <a href={`/topics/${topic.id}/posts`} class="card shadow-md rounded-none">
      <div class="card-body flex-row justify-between">
        <div>
          <h2 class="card-title">
            {topic.title}
          </h2>
          <span>by {topic.author.name}</span>
        </div>
        <span>
          {topic.dateCreated}
        </span>
      </div>
    </a>
  {/each}
</main>
