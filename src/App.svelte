<script>
  import ColorSave from './ColorSave.svelte'
  import ColorTable from './ColorTable.svelte'
</script>
<style>
  :global(body) {
    min-width: 500px;
  }
  :global(body) {
    min-height: 50vh;
  }
</style>
<div bp="grid">
  <div bp="10 offset-2">
    <h1>Color Picker</h1>
  </div>
</div>
<ColorSave/>
<ColorTable/>

