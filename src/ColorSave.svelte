<script>
  import Textfield from '@smui/textfield'
  import Button, {Label} from '@smui/button'
  import { onMount } from 'svelte'
  import Slider from './Slider.svelte'
  import {rgbToHex} from './helpers/color-helpers.js'
  import colorStore from './stores/color-store.js'
  import selectColor from './stores/select-color.js'

  let mode = "add";
  let id = null;
  let name = "";
  let red = 100;
  let green = 0;
  let blue = 100;
  
  $: hexColor = rgbToHex(red,green,blue);
  $: canSaveColor = name.length >= 3;

  onMount(() => {
    selectColor.subscribe(c => {
      if(!c) {
        return;
      }
      name = c.name;
      id = c.id;
      red = c.red;
      blue = c.blue;
      green = c.green;
      mode = 'edit';
    })
  })
  function reset() {
      name = "";
      red = 100;
      green = 0;
      blue = 100;
      mode = "add";
      id = null;
  }
  function addColor() {
      colorStore.addColor(red,green,blue,name);
      reset();
  }
</script>
<style>
  .color-display {
    height: 100px;
  }
  .color-controls {
    margin-top: 20px;
  }
  .color-numbers {
    margin-top: 20px;
    padding: 20px;
  }
  .color-numbers > div {
    height: 50px;
    border: solid 1px gray;
    text-align: center;
    justify-content: space-around;
    padding: 5px;
  }
</style>
<div bp="grid vertical-end">
  <div bp="8 offset-2">
    <Textfield bind:value={name} label="Color Name" fullwidth="true"/>
  </div>
  <div bp="2">
    <Button on:click={addColor} disabled={!canSaveColor} variant="unelevated" color="secondary">
        <Label>Save Color</Label>
    </Button>    
  </div>
</div>
<div class="color-controls">
  <Slider bind:color={red} bgColor="#AA0000"/>
  <Slider bind:color={green} bgColor="#00AA00"/>
  <Slider bind:color={blue} bgColor="#0000AA"/>
</div>
<div bp="grid">
  <div style="background-color: rgb({red},{green},{blue})" class="color-display" bp="10 offset-2">
  </div>
</div>
<div bp="grid" class="color-numbers">
  <div bp="offset-2 5">
    
    Red : {red} Green : {green} Blue : {blue}
  </div>
  <div bp="5">
    HEX <br/>
    {hexColor}
  </div>
</div>