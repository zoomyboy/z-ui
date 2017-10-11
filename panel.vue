<template>
<div class="cp-wrap cp-panel">
    <div class="panel">
        <div class="panel-heading">
			<h3 :class="['panel-title', {'smalltitle': smalltitle}]">{{ title }}</h3>
			<div v-if="closeable" class="close-button" @click="$emit('close')"><span class="fa fa-close"></span></div>
        </div>
        <div class="panel-body">
			<div v-if="loading" class="spinner loading">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
			<slot></slot>
        </div>
    </div>
</div>
</template>

<style lang="less">
	@import "~uiStyle";

	.cp-wrap.cp-panel {
	    border: 0;
		border-radius: 3px;
		box-shadow: 0 1px 1px rgba(0,0,0,0.2);
		background-color: #fff;
		.panel-heading {
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
			height: 50px;
			padding: 0;
			color: #4d627b;
    		border-bottom: 1px solid rgba(0,0,0,0.1);
			padding: 0 20px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.close-button {
				font-size: 20px;
				cursor: pointer;
			}
			.panel-title {
				font-weight: 600;
				font-size: 1.2em;
				line-height: 50px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&.smalltitle {
					font-size: 1.0em;
				}
			}
		}
		.panel-body {
			.loading {
				.double-bounce1, .double-bounce2 {
					background: @primary;
				}
			}
			.table.table-striped {
				&>tbody>tr:nth-child(2n+1) {
    				background-color: #f5f7f8;
				}
				& > tbody td {
					border-top-color: rgba(0,0,0,0.09);
    				color: #8f9ea6;
				}
				&>thead {
					color: #4d627b;
				}
			}
		}
	}
</style>

<script>
	export default {
		data: function() {
			return  {

			};
		},
		props: {
			title: {
				type: String,
				required: false,
				default: ''
			},
			closeable: {
				type: Boolean,
				default: false
			},
			smalltitle: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		mounted: function() {
			if (this.loading) {
				
			}
		}
	}
</script>
