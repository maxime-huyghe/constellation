<script lang="ts">
  import type { User } from "@prisma/client";

  export let users: User[];
</script>

<form method="post">
  <label>
    Email
    <input name="email" />
  </label>
  <label>
    Name
    <input name="name" />
  </label>
  <button type="submit">Create new user</button>
</form>

{#each users as user}
  {JSON.stringify(user)}
{/each}
