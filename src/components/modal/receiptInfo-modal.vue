<template>
	<div class="receiptInfo-modal" v-show="showModal">
		<div class="title">填写收货信息</div>
		<div class="close" @click="close">
			<img src="~@/assets/close.png" class="img">
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				showModal: false,
			}
		},
		mounted() {
			this.modalEvent();
		},
		methods: {
			modalEvent() {
				Bus.$on('openReceiptInfoModal', function() {
					this.showModal = true;
				}.bind(this));
			},
			close() {
				this.showModal = false;
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	.receiptInfo-modal {
		position: absolute;
		top: 0;
		left: 0;
		width: 90%;
		height: 100%;
		background-color: #fff;
		border-radius: 1rem;

		.title {
			height: 2rem;
			text-align: center;
			font-size: 1.2rem;
			color: #040404;
			font-weight: 600;
			margin-top: 0.8rem
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;
			width: 2.1rem;
			height: 2.1rem;

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>