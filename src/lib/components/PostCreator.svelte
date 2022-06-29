<script lang="ts">
  export let postUrl: string;
</script>

<div class="card shadow-md">
  <form method="post" href={postUrl} class="card-body">
    <textarea class="textarea" name="text" placeholder="post" required />
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-primary">Send post</button>
    </div>
  </form>
</div>
