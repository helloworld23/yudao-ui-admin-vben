import { defineAsyncComponent } from 'vue';

const modules = import.meta.glob('../views/**/*.{vue,tsx}');
// TODO @xingyu：这个要不要融合到哪个 router util 里？ utils 里面没有引入 vue 使用不了 defineAsyncComponent
/**
 * 注册一个异步组件
 * @param componentPath 例:/bpm/oa/leave/detail
 */
export const registerComponent = (componentPath: string) => {
  for (const item in modules) {
    if (item.includes(componentPath)) {
      // 使用异步组件的方式来动态加载组件
      return defineAsyncComponent(modules[item] as any);
    }
  }
};
