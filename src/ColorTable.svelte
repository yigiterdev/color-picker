<script>
    import colorStore from './stores/color-store.js'
    import selectColor from './stores/select-color.js'
    import DataTable, { Head , Body , Row , Cell } from '@smui/data-table'
    import Textfield from '@smui/textfield'
    import Switch from '@smui/switch'
    import FormField from '@smui/form-field'
    import { rgbToHex } from './helpers/color-helpers.js'

    let colors = [];
    $: tableColors = filterRow(colors,favoriteOnly,filterName);
    let filterName = '';
    let favoriteOnly = false;

    colorStore.subscribe(color => {
        colors = color;
    })
    function filterRow(color,favOnly,name) {
        const newColors = colors.filter(c => c.isFavorite || !favOnly)
                                .filter(c => c.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        return newColors;
    }
    function fav(id) {
        colorStore.favoriteColor(id,true);
    }
    function unfav(id) {
        colorStore.favoriteColor(id,false);
    }
    function deleteColor(id) {
        colorStore.deleteColor(id);
    }
    function selectColorFromTable(red,green,blue,name,id) {
        selectColor.setColor(red,green,blue,name,id);
    }
</script>
<style>
    :global(.favorite) {
        float:right;
    }
    div[bp="grid"] {
        margin-top: 20px;
    }
    :global(.mdc-data-table__header-cell, .mdc-data-table__content) {
        text-align: center;
    }
    .material-icons {
        cursor:pointer;
    }
    :global(tbody > tr) {
        cursor: pointer;
    }
    .heart {
        color:#000;
    }
    
</style>
<div bp="grid vertical-end">
    <div bp="offset-2 5">
        <Textfield bind:value={filterName} label="Filter Colors" fullwidth="true"/>
    </div>
    <div bp="5">
        <FormField class="favorite">
            <Switch bind:checked={favoriteOnly}/>
            <span slot="label">Favorite</span>
        </FormField>
    </div>
</div>
<div bp="grid">
    <div bp="offset-2 10">
        <DataTable style="width: 100%;">
            <Head>
                <Row>
                    <Cell>Fav</Cell>
                    <Cell>Name</Cell>
                    <Cell>Color</Cell>
                    <Cell>Hex</Cell>
                    <Cell/>
                </Row>
            </Head>
            <Body>
                {#each tableColors as color (color.id)}
                    <Row on:click={selectColorFromTable(color.red,color.green,color.blue,color.name,color.id)}>
                        <Cell>
                            {#if color.isFavorite}
                                <i on:click|stopPropagation = {unfav(color.id)} class="material-icons heart">favorite</i>
                            {:else}
                                <i on:click|stopPropagation= {fav(color.id)} class="material-icons heart">favorite_border</i>
                            {/if}
                        </Cell>
                        <Cell>{color.name}</Cell>
                        <Cell style="background-color: rgb({color.red},{color.green},{color.blue})"/>
                        <Cell>{rgbToHex(color.red,color.green,color.blue)}</Cell>
                        <Cell><i on:click|stopPropagation= {deleteColor(color.id)} class="material-icons">delete</i></Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    </div>
</div>
