<script lang="ts" setup>
import { DocAlert, Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';
</script>

<template>
  <Page>
    <DocAlert
      title="【营销】砍价活动"
      url="https://doc.iocoder.cn/mall/promotion-bargain/"
    />
    <Button
      danger
      type="link"
      target="_blank"
      href="https://github.com/yudaocode/yudao-ui-admin-vue3"
    >
      该功能支持 Vue3 + element-plus 版本！
    </Button>
    <br />
    <Button
      type="link"
      target="_blank"
      href="https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/src/views/mall/promotion/bargain/activity/index"
    >
      可参考
      https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/src/views/mall/promotion/bargain/activity/index
      代码，pull request 贡献给我们！
    </Button>
  </Page>
</template>
