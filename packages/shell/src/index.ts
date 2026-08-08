import './style.css';

export { default as DqInspectorStack } from './components/DqInspectorStack.vue';
export { default as DqInspectorSection } from './components/DqInspectorSection.vue';
export { default as DqInspectorSectionBody } from './components/DqInspectorSectionBody.vue';
export { default as DqInspectorEmpty } from './components/DqInspectorEmpty.vue';
export { default as DqInspectorList } from './components/DqInspectorList.vue';
export { default as DqInspectorListItem } from './components/DqInspectorListItem.vue';
export { default as DqInspectorCallout } from './components/DqInspectorCallout.vue';
export { default as DqInspectorKv } from './components/DqInspectorKv.vue';
export { default as DqPrefForm } from './components/DqPrefForm.vue';
export { default as DqPrefPane } from './components/DqPrefPane.vue';
export { default as DqPrefRow } from './components/DqPrefRow.vue';
export { default as DqSurfaceCard } from './components/DqSurfaceCard.vue';
export { default as DqToolCard } from './components/DqToolCard.vue';
export type { DqToolCardStatus } from './components/DqToolCard.vue';
export { default as DqPillTabs } from './components/DqPillTabs.vue';
export type { DqPillTabItem } from './components/DqPillTabs.vue';
export { default as DqCommandPalette } from './components/DqCommandPalette.vue';
export { default as DqDesktopHost } from './components/DqDesktopHost.vue';
export type { DqCommandAction } from './components/commandPaletteTypes';
export { useDqDesktopExperience } from './composables/useDqDesktopExperience';
export type { UseDqDesktopExperienceOptions } from './composables/useDqDesktopExperience';
export {
  createDqDefaultCommandActions,
  useDqCommandActions,
} from './composables/useDqCommandActions';
export type {
  DqDefaultCommandOptions,
  UseDqCommandActionsOptions,
} from './composables/useDqCommandActions';
export { useDqRecentCommands } from './composables/useDqRecentCommands';
export type { UseDqRecentCommandsOptions } from './composables/useDqRecentCommands';
export {
  createDqCommandRegistry,
  provideDqCommandRegistry,
  useDqCommandRegistry,
} from './composables/useDqCommandRegistry';
export type { DqCommandRegistry } from './composables/useDqCommandRegistry';
export { useDqRegisterCommands } from './composables/useDqRegisterCommands';
export type { UseDqRegisterCommandsOptions } from './composables/useDqRegisterCommands';
export { useDqWindowActivity } from './composables/useDqWindowActivity';
export type { UseDqWindowActivityOptions } from './composables/useDqWindowActivity';

export {
  DqButton,
  DqIconButton,
  DqDialog,
  DqDrawer,
  DqSegmented,
  DqEmpty,
  DqTag,
  DqCountBadge,
  DqAlert,
  DqProgress,
  DqTooltip,
  DqCollapse,
  DqCollapseItem,
  DqText,
  DqStack,
  DqRow,
  DqCol,
  DqAppBar,
  DqMessageBubble,
  DqActionCard,
  DqInput,
  DqSelect,
  DqOption,
  DqSlider,
  DqSwitch,
  DqCheckbox,
  DqCheckboxGroup,
  DqInputNumber,
  DqDatePicker,
  DqIcon,
  DqDropdown,
  DqDropdownMenu,
  DqDropdownItem,
  DqSectionTabs,
  DqSectionTabTrigger,
  DqSectionTabPanel,
} from '@danqing/dq-ui';

export {
  toast,
  confirm,
  installDanQingFeedback,
  registerDqIcons,
  dqIconComponents,
} from '@danqing/dq-ui';
export {
  Aim,
  ArrowLeft,
  ArrowRight,
  Box,
  Bot,
  Brush,
  Check,
  ChevronDown,
  CircleDot,
  Close,
  CopyDocument,
  Cpu,
  Delete,
  Document,
  DocumentCopy,
  Download,
  FileCode,
  Filter,
  Film,
  FolderChecked,
  Globe,
  Grid,
  Headset,
  Library,
  Link,
  ListOrdered,
  Loading,
  MagicStick,
  Menu,
  Microphone,
  Monitor,
  MoreFilled,
  Pause,
  Play,
  Picture,
  PictureFilled,
  Plus,
  Refresh,
  Search,
  Send,
  Setting,
  Star,
  StopCircle,
  Unplug,
  Terminal,
  Tools,
  Upload,
  VideoCamera,
  VideoPlay,
  ZoomIn,
} from '@danqing/dq-ui';

export const DQ_SHELL_VERSION = '0.1.0';
