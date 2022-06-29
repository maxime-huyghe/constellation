<script lang="ts">
  export let authorName: string;
  export let dateCreated: Date;
  export let text: string;
  export let id: number;
</script>

<div class="card shadow-md" id={id.toString()}>
  <div class="card-body flex-row">
    <div class="w-32">
      <span>{authorName}</span>
    </div>
    <div class="divider divider-horizontal" />
    <div class="w-full">
      <div class="flex flex-row justify-end">
        <span>{dateCreated}</span>
      </div>
      <div class="divider" />
      <div class="prose">
        <p>{text}</p>
      </div>
    </div>
  </div>
</div>
