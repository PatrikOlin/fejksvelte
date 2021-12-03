<script>
    import { fade, fly } from "svelte/transition";
    export let person;
</script>

<figure
    in:fly={{ y: 200, duration: 500 }}
    out:fade
    class="flex bg-gray-100 flex justify-center items-center rounded-xl p-8 m-5"
>
    <img
        class="w-18 h-18 rounded-none mx-auto"
        src="https://via.placeholder.com/150"
        alt="fancy"
    />
    <div class="px-6 text-left">
        <h1 class="text-xl text-cyan-600 font-semibold">{person.name}</h1>
        <div>
            <p><span class="font-semibold">Email: </span>{person.email}</p>
            <p><span class="font-semibold">Personnr: </span>{person.pin}</p>
            <p><span class="font-semibold">Adress: </span>{person.address}</p>
            <p><span class="font-semibold">Tel: </span>{person.phone}</p>
            <p><span class="font-semibold">Pass: </span>{person.password}</p>
        </div>
    </div>
</figure>

<style>
</style>
