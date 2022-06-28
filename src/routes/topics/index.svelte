<script lang="ts">
  import type { TopicWithAuthorName } from ".";

  export let topics: TopicWithAuthorName[];
</script>

<main class="container mx-auto p-4">
  {#each topics as topic}
    <a href={`/topics/${topic.id}`} class="card shadow-md rounded-none">
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
