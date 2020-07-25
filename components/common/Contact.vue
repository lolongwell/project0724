<template>
	<button open-type='contact' class="_c"></button>
</template>
<script>
export default {
    name: 'Contact',
	data() {
		return {};
	},
	methods: {
	}
}
</script>
<style lang="scss" scoped>
		
	._c{
		position: fixed;
		left: 10rpx;
		bottom: 200rpx;
		display: inline-block;
		width: 50rpx;
		height: 55rpx;
		background-color: #000;
		opacity: 0.8;
		border-radius: 50%;
		z-index: 10000000;
		&::before{
			content: "";
			width: 48rpx;
			height: 48rpx;
			display: block;
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE7klEQVRoQ+2ZWYhdRRCGv/9B1CgqLigYQVFUDMR9X3AQt6AGCSJCXEJQH9xQcI2YiBqjD8ZoHozGGFdEcYsPrmAgcSNuiPuCKxH1QU1ERYSSf+gTzj33nHv73rnOJDIFh4HbVdX1d3X/Vd0jNnDRBh4/4wDGOoPjGSgyEBHbAacBuwHbAtsAE4DvgE+BT4C3JH0zyKyNOAMRcSxwbgo+J7aPgZXA45JeyjHopNM3gIjYCbgCuHAEQSwEbpXkLPUlfQGIiL2Ax4BJpVm/B14HXgbeAX5M32bADsD2gLN1HHBAye4LZ1DS8n4Q9AwgIg4G3ihN9hWwQNKC3AAiYhpwCXBkyWaoHxA9AYiIo4FXSpPeBcyW9FNu8GW9iLgGuKn02yRJH/XiKxtARBwCPA9smSaYI+n6Xiar042Iw9Oh9vBfwP69gOgFwHPACSmIhZIuqgaUtpd1TKFbp2/Tkp5X135WSPqtRME7A96KlneBIyT9kbM4WQAi4izg/uRwrqRZpcn3AC4ATkw1IGfen02jiUqHD29EnAPc12t2cwG8CRzk1ZM0pRS8afTyVLhyAq/TuUfSeQmEARiIV99ZcDY6SlcAlYN7lKQVaTLTqCvvIGS5pKGI8FYyFZt250u6rJvzHAC3AZcCz0o65T8IvohxiaSZETEXuDrVkMndGC4HgNO4D3C+pLsj4g6g7QB3W6nM8cWpun8LbO6Fk3R7J9uOACJiK8Acv5HpDdgTeDgzmKra+8CNqYJ3cnFMqtZXAqsk+ew1SjcAhwGvJutdU5uwSx8A/gH2Nr9HhM+Nz0+TLJM0NSIiKUyT9GSTciOAiJgNzCkZmt9dyPqRGZKWFoZdQPyd+qZfkv4aM523b93EtQAioo5hbk6HqxcALlx3SnLL0SIRMRW4ttLYFTqnAk9VTJZKmlH10wagIXjbvQZ4S+XIDw4ccMVe22QQEb7wGIRZpyzzgKtq7FqKqMdbAETESabLhgm/BHwOOol7GQfuVc/u8SNiKFH1ycn5Q8D0mons39T6eTFWBbAMKJxU7X9P1FYH4FfgEWCRJLNNXxIRhyYgLmgHNjhpaSKrAHzdM1XWiS8sEysD7wEPAo9KWt1X1A1GJRaqarwgqWgq27bQn8AmDT7dfBWtw9OAD9Uzgwy67KsDgDWSipa+DYBfD3ZvCGp+OjP3Svqg0Cm10L6kZ11GIsIvF+5e/Urh3qdNOgBYLWnHpjPgfXxGA4AJkpyhdRIRGyd22g/4zC1HVachOLcMM9PYFEm+I7RIBwArJa27ilbPgOnMzVSbSKqjXLOSL+WFuNp2PcQR4QwWDwIXSzJz5QJ4QNLZTRlwcfH+zgJgpYhYBLifz2p/k42rvG288vMklRdheO4OGejIQr4GmmP9t0XqMlAHdFC/NQBYK2mL8hx128Ktslvm9Q2Az9h0Sas6Akjp88OVKfN4wC9wE0czAxHheuNK/iLwtj9JT9Ru7UGlfJB+IqK4BXZ9J+p6IxtkYDm+Sq32DZKu62azXgEoBZ/NaOsNgIhwr78EWCzJz/VZMuYAImLfdB8YvmpKOj0r8qQ0pgAiwpXfD7x+fpwl6ZZegrfuqAOICP+f4Mz0TU69lIMfnf8P9LpCVf1KH2S6dPC+afUlY5EBPxh86MdiSV/3FXXJaNQBjDTgthZn0A5H2994BkZ7xf93W+hfszi3QDK+gtoAAAAASUVORK5CYII=");
			background-position: 0rpx;
			background-repeat: no-repeat;
			background-size: 43rpx;
			position: relative;
			left: -22rpx;
		}
	}
</style>
