<script>
	import CreatePoll from './Components/CreatePoll.svelte';
	import Footer from './Components/Footer.svelte';
	import Header from './Components/Header.svelte';
  	import PollList from './Components/PollList.svelte';
	import Tabs from './Shared/Tabs.svelte'
	import PollStore from './Stores/PollStrore';


	let items = ['Current Polls', 'Add New Polls'];
	let activeItem = 'Current Polls';

	const tabChange = (e)=>{
		activeItem = e.detail;
	}
	
	const handleAdd = (e)=>{
		
		activeItem = 'Current Polls';
	}
	const handleVote = (e)=>{
		
	}
</script>
<Header/>
<main>
	<Tabs {items} {activeItem} on:tabChange = {tabChange}/>
	{#if activeItem == 'Current Polls' }
		
		<PollList/>
	{:else if activeItem == 'Add New Polls'}
		<CreatePoll on:add={handleAdd}/>
	{/if}
	
</main>
<Footer/>
<style>
	main{
		max-width: 960px;
		margin: 40px auto ;
		padding: 10px;

	}
	
	
</style>