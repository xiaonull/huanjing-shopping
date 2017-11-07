<template>
	<div class="modal-mask" v-show="showModal">
		<div class="modal shopping-modal">
			<div class="title">商城</div>
			<div class="modal-close" @click="close()"></div>
			<div class="modal-content">
				<div class="tabs-head">
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 1}" @click="clickOuterTab(1)">兑换商城</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 2}" @click="clickOuterTab(2)">我的订单</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 3}" @click="clickOuterTab(3)">兑换明细</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 4}" @click="clickOuterTab(4)">地址列表</div>
				</div>
				<div class="tabs-content">
					<div class="tabs-content-item goodsPage" v-if="outerTabSelect === 1">
						<div class="itemContainer">
							<div class="item">
								<div class="imgContainer">
									<img src="~@/assets/juzi.png" class="img">
									<span class="stock">剩余15件</span>
								</div>
								<div class="btn num">12果子每件</div>
								<div class="exchange">
									兑换
								</div>
							</div>
						</div>
						<div class="itemContainer">
							<div class="item">
								<div class="imgContainer">
									<img src="~@/assets/juzi.png" class="img">
									<span class="stock">剩余15件</span>
								</div>
								<div class="btn num">12果子每件</div>
								<div class="exchange">
									兑换
								</div>
							</div>
						</div>
						<div class="itemContainer">
							<div class="item">
								<div class="imgContainer">
									<img src="~@/assets/juzi.png" class="img">
									<span class="stock">剩余15件</span>
								</div>
								<div class="btn num">12果子每件</div>
								<div class="exchange">
									兑换
								</div>
							</div>
						</div>
					</div>
					<div class="tabs-content-item orderPage" v-if="outerTabSelect === 2">
						<div class="item">
							
						</div>
					</div>
					<div class="tabs-content-item detailPage" v-if="outerTabSelect === 3"></div>
					<div class="tabs-content-item addressPage" v-if="outerTabSelect === 4">
						<div class="list">
							<div class="item">
								<img src="~@/assets/gou-ico2.png" class="gouIco">
								<p class="address">广东省广州市天河区五山街道华南农业大学创客空间</p>
								<p class="info">
									<span class="name">某某某</span>
									<span class="phone">18888888888</span>
								</p>
								<img src="~@/assets/setting.png" class="settingIco">
							</div>
						</div>
						<div class="add" @click="addAddress">添加</div>
					</div>
					<receiptInfoModal></receiptInfoModal>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import ReceiptInfoModal from '@/components/modal/receiptInfo-modal';

	export default {
		data() {
			return {
				showModal: false,
				outerTabSelect: 1
			}
		},
		components: {
			ReceiptInfoModal
		},
		mounted() {
			this.modalEvent();
		},
		methods: {
			modalEvent() {
				Bus.$on('openShoppingModal', function() {
					this.showModal = true
				}.bind(this))
			},
			close () {
				this.showModal = false
			},
			clickOuterTab(index) {
				this.outerTabSelect = index;
			},
			addAddress() {
				Bus.$emit('openReceiptInfoModal');
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	// flex布局水平垂直居中
	.flex-both-center () {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 商城模态框样式
	.shopping-modal {
		.flex-both-center();
		width: 70%;
		height: 80%;

		.title {
			position: absolute;
			text-align: center;
			top: 0.5rem;
			font-size: 1.3rem;
		}

		.modal-content {
			display: flex;
			justify-content: space-between;
			width: 92%;
			height: 85%;

			.tabs-head {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				height: 100%;
				width: 25%;
				font-size: 0.85rem;
				padding-top: 1.8rem;
				box-sizing: border-box;

				.tabs-head-item { 
					margin-bottom: 30%;
					.flex-both-center();
					width: 100%;
					height: 1.5rem;
					border-radius: 1.5rem;
					background-color: rgba(0, 0, 0, 0.4);

					&.head-select {
						color: yellow;
					}
				}
			}

			.tabs-content {
				position: relative;
				width: 68%;
				height: 97%;
				margin-top: 5%;
				overflow: hidden;

				.tabs-content-item {
					background-color: rgba(0, 0, 0, 0.4);
					border: 1px solid #000;
					border-left-color: rgba(238, 158, 25, 0.5);
					border-top-color: rgba(200, 210, 10, 0.5);
					border-right-color: rgba(238, 158, 25, 0.5);
					border-bottom-color: rgba(200, 210, 10, 0.5);
					border-radius: 0.5rem;
					overflow: hidden;
				}

				.goodsPage {
					width: 85%;
					height: 98%;

					.itemContainer {
						display: inline-block;
						width: 50%;
						height: 50%;
						float: left;

						.item {
							width: 70%;
							height: 90%;
							margin: 5% auto 0 auto;

							.imgContainer {
								width: 75%;
								height: 50%;
								margin: 0 auto 5% auto;
								position: relative;

								.img {
									width: 100%;
									height: 100%;
								}

								.stock {
									display: inline-block;
									position: absolute;
									bottom: 0;
									right: 0;
									background-color: rgba(0, 0, 0, 0.4);
									border-radius: 1.5rem;
									font-size: 0.3rem;
								}
							}

							.btn {
								width: 75%;
								height: 1rem;
								line-height: 1rem;
								margin: 0.6rem auto 0 auto;
								-webkit-text-size-adjust: none;
								font-size: 0.7rem;
								text-align: center;
								white-space: nowrap;
								border: 1px solid #000;
								border-left-color: rgba(238, 158, 25, 0.5);
								border-top-color: rgba(200, 210, 10, 0.5);
								border-right-color: rgba(238, 158, 25, 0.5);
								border-bottom-color: rgba(200, 210, 10, 0.5);
								border-radius: 1rem;
							}

							.exchange {
								width: 60%;
								height: 1.1rem;
								line-height: 1.1rem;
								margin: 0.7rem auto 0 auto;
								font-size: 0.8rem;
								text-align: center;
								background-image: url('~@/assets/an-bg01.png');
								background-size: 100% 100%;
							}
						}
					}
				}

				.orderPage {
					width: 85%;
					height: 98%;

					.item {
						width: 100%;
						height: 7rem;
						background-color: #E53636;
					}
				}

				.addressPage {
					position: relative;
					width: 90%;
					height: 90%;

					.list {
						width: 100%;
						height: 85%;
						overflow-y: scroll;

						.item {
							width: 90%;
							min-height: 3.3rem;
							line-height: 1rem;
							margin-left: 5%;
							position: relative;
							background-color: rgba(0, 0, 0, 0.4);
							border-radius: 0.5rem;

							.gouIco {
								position: absolute;
								top: 0rem;
								left: -0.5rem;
								width: 2rem;
								height: 2rem;
							}

							.info {
								font-size: 0.8rem;
								line-height: 0.8rem;
								padding-left: 0.5rem;

								.phone {
									position: absolute;
									bottom: 0.5rem;
									right: 2.5rem;
								}
							}

							.address {
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								font-size: 0.8rem;
								line-height: 0.8rem;
								padding-left: 0.5rem;
								padding-top: 0.5rem;
							}

							.settingIco {
								position: absolute;
								bottom: 0.2rem;
								right: 0.2rem;
								width: 1.3rem;
								height: 1.3rem;
							}
						}
					}

					.add {
						position: absolute;
						width: 3rem;
						height: 1.1rem;
						line-height: 1.1rem;
						bottom: 0.5rem;
						right: 0.5rem;
						background-image: url('~@/assets/an-bg01.png');
						background-size: 100% 100%;
						text-align: center;
						font-size: 0.8rem;
					}
				}
			}
		}
	}
</style>