<script>
 	import { onMount, onDestroy } from 'svelte';
 	import { fejkStore, getNumOfPeople } from './store/fejkStore';
 	import Loader from './shared/Loader.svelte';
 	import PeopleCard from './components/PeopleCard.svelte';

	export let name;
 	let numOfPeople = 5
 	let timer;

 	onMount(async () => {
		await fejkStore.loadPeople(numOfPeople)
	})

 	const handleChange = async val => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			numOfPeople = val
			if (val > 0) {
				await fejkStore.loadPeople(val)
			}
		}, 250)
	}

</script>

<main class="flex flex-col">
	<h1>Hello {name}!</h1>
	{#if $fejkStore.isLoading}
		<div
			class="text-4xl text-pink-900"
			style="display: flex; flex-direction: column; place-items: center;
				   place-content: center">
			<Loader />
		</div>
	{:else}
		<section class="flex flex-row mx-auto">
			<div class="mx-auto">
		<label>
			<p>Antal personer</p>
			<input type=range value={numOfPeople} min=0 max=10 on:change={(e) => handleChange(e.target.value)}>
		</label>
			</div>
		</section>
		<section class="flex flex-row flex-wrap mx-auto">
		{#each $fejkStore.people as person}
			<PeopleCard person={person}/>
		{/each}
		</section>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		width: 100vw;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
