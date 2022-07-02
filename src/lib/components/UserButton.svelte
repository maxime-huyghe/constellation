<script lang="ts">
  import { page, session } from "$app/stores";
  $: user = $session.user;
</script>

<!-- svelte-ignore empty-block -->
{#if user}
  <div class="dropdown dropdown-end">
    <button tabindex="0" class="btn btn-ghost gap-2">
      {user.name}
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/192/192/people" alt={`${user.name}'s avatar`} />
        </div>
      </div>
    </button>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <a href="/users/me" class="flex justify-between">
          <span>My profile</span>
          <i class="fa-solid fa-user" />
        </a>
      </li>
      <li>
        <a href={`/logout?ref=${$page.url}`} class="flex justify-between">
          <span>Log out</span>
          <i class="fa-solid fa-right-from-bracket" />
        </a>
      </li>
    </ul>
  </div>
{:else}
  <a href={`/login?ref=${$page.url}`} class="btn btn-ghost gap-2">
    Log in
    <i class="fa-solid fa-right-to-bracket text-xl" />
  </a>
{/if}
