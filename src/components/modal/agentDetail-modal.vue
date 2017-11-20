<template>
	<div class="modal-mask" v-show="showModal">
		<div class="agentDetail-modal modal">
			<div class="modal-close" @click="close($event)"></div>
			<div class="modal-head">代理商详情</div>
			<div class="modal-content">
				<p>后台管理网址：http://admin.juzhuange.cn/agent</p>
				<p>代理商总收益：{{directPush}}</p>
				<p>代理商总下线：{{countAgent}}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { applyAgent } from '@/js/allAxiosRequire'

	export default {
		props: ['directPush', 'countAgent'],
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
				Bus.$on('openAgentDetailModal', () => {
					this.showModal = true
				});
			},
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
	.agentDetail-modal {
		display: flex;
		flex-direction: column;
		width: 60%;
		height: 50%;
		.modal-head {
			height: 3rem;
			.flex-both-center()
		}
		.modal-content {
			flex: 1;
			padding: 0.5rem 2rem;
			overflow: hidden;
			font-size: 1rem;
			
			p {
				margin: 0;
				margin-top: 1rem;
			}
		}
	}
</style>