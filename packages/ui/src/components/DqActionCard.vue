<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <section class="dq-action-card" role="group">
    <header v-if="title || $slots.title" class="dq-action-card__header">
      <slot name="title">
        <h3 class="dq-action-card__title">{{ title }}</h3>
      </slot>
    </header>
    <div v-if="description || $slots.default" class="dq-action-card__body">
      <p v-if="description" class="dq-action-card__desc">{{ description }}</p>
      <slot />
    </div>
    <footer v-if="$slots.actions" class="dq-action-card__actions">
      <slot name="actions" />
    </footer>
  </section>
</template>
