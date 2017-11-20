<template>
	<div class="modal-mask" v-show="showModal">
		<div class="confirm-modal modal">
			<div class="modal-close" @click="close($event)"></div>
			<div class="modal-head">申请代理商</div>
			<div class="modal-content">
				<p class="text">您是否要申请做代理商？</p>
				<div class="form">
					<div class="btn sure" @click="sure">确定</div>
					<div class="btn cancel" @click="close($event)">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { applyAgent } from '@/js/allAxiosRequire'

	export default {
		data () {
			return {
				showModal: false,
			}
		},
		mounted () {
			this.bindModalEvent()
		},
		components: {
		},
		methods: {
			close () {
				this.showModal = false
			},
			bindModalEvent () {
				Bus.$on('openConfirmModal', () => {
					this.showModal = true
				});
			},
			sure() {
				applyAgent()
				.then(function (response) {
					Bus.$emit('refreshData')
					this.showModal = false
					Bus.$emit('openTipModal', response.data.msg)
				}.bind(this))
				.catch(function (err) {
					console.log(err);
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				}.bind(this))
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
	.confirm-modal {
		display: flex;
		flex-direction: column;
		width: 50%;
		height: 40%;
		.modal-head {
			height: 3rem;
			.flex-both-center()
		}
		.modal-content {
			flex: 1;
			padding: 0.5rem 2rem;
			overflow: hidden;
			
			.text {
				margin: 0;
				font-size: 0.9rem;
				text-align: center;
			}

			.form {
				margin-top: 2rem;
				text-align: center;

				.btn {
					display: inline-block;
					padding: 0.3rem 1rem;
					border-radius: 0.6rem;
					font-size: 1rem;
					margin: 0 0.3rem;
				}

				.sure {
					background-color: #3D61F1;
				}

				.cancel {
					background-color: #F93246;
				}
			}
		}
	}
</style>