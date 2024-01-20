<template>
  <div class="relative flex h-full w-full flex-col justify-between p-10 text-white">
    <div class="relative z-10 ml-20 mt-24 text-9xl font-bold">
      <h1 class="mb-16">多人协同</h1>
      <h1 class="mb-16 ml-48">知识库</h1>
      <h2 class="ml-96">知识尽在掌握</h2>
    </div>
    <div class="z-10 mb-32 ml-20 grid w-2/3 grid-cols-2 place-content-center gap-y-20 text-2xl font-bold">
      <h3>👁优秀文章看得见</h3>
      <h3>📝互动协作编辑</h3>
      <h3>📋多种编辑器且支持内容管理</h3>
      <h3>📦数据安全</h3>
    </div>
    <nuxt-img
      class="absolute bottom-0 right-0 z-0 ml-auto"
      src="/images/woman-on-book.png"
      placeholder
      alt="首页背景"
      sizes="100vw sm:50vw md:45vw"
      loading="lazy"
    ></nuxt-img>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'desktop-with-head',
});
</script>
