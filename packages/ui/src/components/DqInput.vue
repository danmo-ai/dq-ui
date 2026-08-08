<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const model = defineModel<string | number | undefined>();

const props = withDefaults(
  defineProps<{
    type?: string;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'default' | 'sm' | 'lg';
  }>(),
  { type: 'text', size: 'default' },
);

const attrs = useAttrs();

const inputType = computed(() => props.type ?? (attrs.type as string) ?? 'text');
const isTextarea = computed(() => inputType.value === 'textarea');

const fieldAttrs = computed(() => {
  const { type: _t, class: _c, style: _s, ...rest } = attrs;
  return rest;
});

const fieldClass = computed(() => {
  const extra = attrs.class;
  const base = isTextarea.value ? ['dq-input', 'dq-input--textarea'] : ['dq-input'];
  if (props.size === 'sm') base.push('dq-input--sm');
  if (props.size === 'lg') base.push('dq-input--lg');
  if (!extra) return base;
  if (typeof extra === 'string') return [...base, extra];
  if (Array.isArray(extra)) return [...base, ...extra];
  return base;
});

const isDisabled = computed(() => props.disabled ?? Boolean(attrs.disabled));
const isReadonly = computed(() => props.readonly ?? Boolean(attrs.readonly));
</script>

<template>
  <textarea
    v-if="isTextarea"
    v-model="model"
    :class="fieldClass"
    :disabled="isDisabled"
    :readonly="isReadonly"
    v-bind="fieldAttrs"
  />
  <input
    v-else
    v-model="model"
    :class="fieldClass"
    :type="inputType"
    :disabled="isDisabled"
    :readonly="isReadonly"
    v-bind="fieldAttrs"
  />
</template>
