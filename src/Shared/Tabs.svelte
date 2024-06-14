<script>
    import {createEventDispatcher} from 'svelte';
    export let items;
    export let activeItem;

    const dispatch = createEventDispatcher();


</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li  on:click={()=>{dispatch('tabChange',item)}}>
                <div class:active = {item == activeItem}>
                    {item}
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .active{
        color:#000000;
        border-bottom: 2px solid #7A7A7A;
        padding-bottom: 8px;
    }
    .tabs{
        margin-bottom: 40px;
    }
    ul{
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
        
        
    }
    li{
        margin: 0 16px;
        font-size:16px ;
        color: #7A7A7A;
        cursor: pointer;
    }
</style>