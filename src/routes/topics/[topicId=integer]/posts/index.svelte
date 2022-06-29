<script lang="ts">
  import { page } from "$app/stores";

  import Post from "$lib/components/Post.svelte";
  import PostCreator from "$lib/components/PostCreator.svelte";
  import type { TopicWithAuthorNameAndPostsWithTheirAuthors } from ".";

  export let topic: TopicWithAuthorNameAndPostsWithTheirAuthors;
</script>

<main class="container mx-auto p-4">
  <div class="flex flex-row justify-between px-2 pb-4">
    <div>
      <h2 class="text-2xl font-bold">
        {topic.title}
      </h2>
      <span>by {topic.author.name}</span>
    </div>
    <div>
      {topic.dateCreated}
    </div>
  </div>
  {#each topic.posts as post}
    <Post authorName={post.author.name} {...post} />
  {/each}
  <PostCreator postUrl={$page.url.toString()} />
</main>
