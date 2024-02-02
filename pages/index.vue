<template>
  <div class="relative flex h-full w-full flex-col justify-between p-10 drop-shadow-2xl backdrop-blur-sm sm:backdrop-blur-none">
    <div class="relative z-10 text-4xl font-bold text-white sm:ml-10 sm:text-6xl lg:ml-20 lg:text-9xl">
      <h1 class="mb-16">多人协同</h1>
      <h1 class="mb-16 ml-12 sm:ml-36 lg:ml-48">知识库</h1>
      <h2 class="ml-24 sm:ml-72 lg:ml-96">知识尽在掌握</h2>
    </div>
    <div
      class="z-10 grid w-full grid-cols-1 place-content-center gap-y-5 text-lg font-bold sm:ml-12 sm:gap-y-10 sm:text-xl lg:mb-32 lg:ml-24 lg:w-2/3 lg:grid-cols-2 lg:gap-y-20 lg:text-2xl"
    >
      <h3>👁 优秀文章看得见</h3>
      <h3>📝 互动协作编辑</h3>
      <h3>📋 多种编辑器且支持内容管理</h3>
      <h3>📦 数据安全</h3>
    </div>
  </div>
  <nuxt-img
    class="absolute bottom-0 right-0 z-0 ml-auto"
    src="/images/woman-on-book.png"
    placeholder
    alt="首页背景"
    sizes="100vw sm:50vw md:45vw"
    loading="lazy"
  ></nuxt-img>
</template>
<script setup lang="ts"></script>
