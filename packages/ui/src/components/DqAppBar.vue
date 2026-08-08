<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <header class="dq-app-bar">
    <div class="dq-app-bar__leading">
      <slot name="leading" />
    </div>
    <div class="dq-app-bar__center">
      <slot>
        <div v-if="title" class="dq-app-bar__title">{{ title }}</div>
        <div v-if="subtitle" class="dq-app-bar__subtitle">{{ subtitle }}</div>
      </slot>
    </div>
    <div class="dq-app-bar__trailing">
      <slot name="trailing" />
    </div>
  </header>
</template>
