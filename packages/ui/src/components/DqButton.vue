<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'text' | 'danger' | 'warning';
    size?: 'default' | 'sm' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    round?: boolean;
    plain?: boolean;
    circle?: boolean;
  }>(),
  {
    type: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    round: false,
    plain: false,
    circle: false,
  },
);

const attrs = useAttrs();

const cls = computed(() => {
  const attrClass = attrs.class;
  const classStr = typeof attrClass === 'string' ? attrClass : '';
  const legacyPlain = props.plain || classStr.includes('is-plain');
  const legacyCircle = props.circle || classStr.includes('is-circle');
  const legacyRound = props.round || legacyCircle;
  return [
    'dq-btn',
    `dq-btn--${props.type}`,
    props.size === 'sm' ? 'dq-btn--sm' : '',
    props.size === 'lg' ? 'dq-btn--lg' : '',
    legacyPlain ? 'dq-btn--plain is-plain' : '',
    legacyRound ? 'dq-btn--round' : '',
    legacyCircle ? 'is-circle' : '',
    attrClass,
  ];
});
</script>

<template>
  <button
    type="button"
    :class="cls"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    v-bind="{ ...attrs, class: undefined }"
  >
    <span v-if="loading" class="dq-btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
