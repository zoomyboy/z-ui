<template>
	<li>
		<a :href="href" v-if="href">
			<span v-if="icon" :class="['fa', 'fa-'+icon]"></span>
			{{ title }}
		</a>
		<router-link v-if="route" :to="{name: route}">
			<span v-if="icon" :class="['fa', 'fa-'+icon]"></span>
			{{ title }}
		</router-link>
	</li>
</template>

<script>
	export default {
		props: ['route', 'href', 'title', 'icon']
	};
</script>
