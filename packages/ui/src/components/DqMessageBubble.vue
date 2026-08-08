<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Chat role chrome — uses --dq-msg-* tokens */
    variant?: 'user' | 'agent' | 'system';
  }>(),
  { variant: 'agent' },
);
</script>

<template>
  <div class="dq-msg dq-msg-enter" :class="`dq-msg--${variant}`">
    <slot />
  </div>
</template>
