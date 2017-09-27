<template>
	<div class="noticeModal">
		<p ref="noticeModalText">欢迎您进入精灵幻境，祝您游戏愉快！</p>
	</div>
</template>

<script>
	export default {
		name: 'noticeModal',
		mounted: function () {
			let text = this.$refs.noticeModalText;
			(function() {
				var left = 10;
				var interval1 = setInterval(function() {
					left -= 1;
					text.style.left = left + 'px';
					if(left === -233) {
						left = 250;
					}
				}, 100);
			})();
		}

	}
</script>

<style lang="less" type="text/less">
	.noticeModal {
		position: absolute;
		top: 3rem;
		left: 0;
		width: 300px;
		height: 1.8rem !important;
		line-height: 0.1rem !important;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 1rem;
		overflow-x: hidden;
		p {
			font-size: 0.6rem;
			position: relative;
		}
	}

</style>