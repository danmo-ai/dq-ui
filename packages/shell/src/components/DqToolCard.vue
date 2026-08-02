<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'

export type DqToolCardStatus = 'pending' | 'running' | 'completed' | 'error' | 'cancelled' | string

const props = withDefaults(
  defineProps<{
    name: string
    status?: DqToolCardStatus
    summary?: string
    preview?: string
    expanded?: boolean
    awaiting?: boolean
    awaitingLabel?: string
    statusLabel?: string
    linkLabel?: string
    showLink?: boolean
  }>(),
  {
    status: 'pending',
    expanded: false,
    awaiting: false,
    showLink: false,
  },
)

const emit = defineEmits<{
  toggle: []
  link: []
}>()

const dotStatus = computed(() => {
  if (props.awaiting) return 'warning'
  if (props.status === 'running') return 'running'
  if (props.status === 'completed') return 'success'
  if (props.status === 'error') return 'danger'
  if (props.status === 'cancelled') return 'pending'
  return 'pending'
})

const rootClass = computed(() => [
  'dq-tool-card',
  props.expanded ? 'is-expanded' : '',
  props.awaiting ? 'is-awaiting' : '',
  props.status === 'running' && !props.awaiting ? 'is-running' : '',
  props.status === 'error' ? 'is-error' : '',
  props.status === 'cancelled' ? 'is-cancelled' : '',
  props.status === 'completed' ? 'is-completed' : '',
])
</script>

<template>
  <div :class="rootClass">
    <button type="button" class="dq-tool-card__header" @click="emit('toggle')">
      <span class="dq-status-dot" :class="`dq-status-dot--${dotStatus}`" aria-hidden="true" />
      <span class="dq-tool-card__name">{{ name }}</span>
      <span v-if="!expanded && summary" class="dq-tool-card__summary">{{ summary }}</span>
      <span class="dq-tool-card__trail">
        <span v-if="awaiting && awaitingLabel" class="dq-tool-card__badge is-awaiting">{{ awaitingLabel }}</span>
        <span v-else-if="statusLabel" class="dq-tool-card__badge" :class="`is-${status}`">{{ statusLabel }}</span>
        <span
          v-if="showLink && linkLabel"
          class="dq-tool-card__link"
          @click.stop="emit('link')"
        >{{ linkLabel }}</span>
        <ChevronDown class="dq-tool-card__chevron" :class="{ 'is-open': expanded }" :size="14" />
      </span>
    </button>

    <div v-if="!expanded && preview && status !== 'running'" class="dq-tool-card__preview">
      {{ preview }}
    </div>

    <div v-show="expanded" class="dq-tool-card__body">
      <slot />
    </div>
  </div>
</template>
