<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, rootCtx, editorViewOptionsCtx, commandsCtx, editorViewCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { commonmark, toggleEmphasisCommand, toggleStrongCommand, toggleInlineCodeCommand, wrapInBlockquoteCommand } from '@milkdown/preset-commonmark'
import { history, redoCommand, undoCommand } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';

import type { Ctx } from '@milkdown/ctx';

import { Undo2, Redo2, Bold, Italic, Quote, Code, Maximize2, Minimize2, Download } from 'lucide-vue-next';
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';

const contentLength = ref(0);
const content = defineModel({ default: '' });
const props = defineProps<{
  title: string,
  maxLength: number | undefined,
  minLength: number | undefined,
}>();
const emit = defineEmits(['update:contentLength']);

const editor = useEditor((root) => {
  return Editor.make()
    .config((ctx) => {
      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        attributes: { class: 'outline-none', spellcheck: 'true' },
      }))
      ctx.set(rootCtx, root)
      ctx.get(listenerCtx).updated(() => {
        content.value = document.getElementsByClassName('ProseMirror')[0]?.innerHTML || '';
        contentLength.value = document.getElementById('milkdown')?.innerText.length || 0;
        emit('update:contentLength', contentLength.value);
      });
    })
    .use(commonmark)
    .use(listener)
    .use(history)
    .use(clipboard)
    .use(trailing)
})

function toggleItalic() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(toggleEmphasisCommand.key);
  });
}

function toggleBold() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(toggleStrongCommand.key);
  });
}

function toggleInlineCode() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(toggleInlineCodeCommand.key);
  });
}

function addBlockquote() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(wrapInBlockquoteCommand.key);
  });
}

function undo() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(undoCommand.key);
  });
}

function redo() {
  editor.get()?.action((ctx: Ctx) => {
    const commandManager = ctx.get(commandsCtx);
    commandManager.call(redoCommand.key);
  });
}

const fullscreen = ref(false)

const toolbar = [
  {
    icon: Undo2,
    action: undo,
    title: 'Rückgängig',
  },
  {
    icon: Redo2,
    action: redo,
    title: 'Wiederholen',
  },
  {
    icon: Bold,
    action: toggleBold,
    title: 'Fett',
  },
  {
    icon: Italic,
    action: toggleItalic,
    title: 'Kursiv',
  },
  {
    icon: Code,
    action: toggleInlineCode,
    title: 'Monospace',
  },
  {
    icon: Quote,
    action: addBlockquote,
    title: 'Zitat',
  },
]

watch(() => fullscreen.value, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
    document.getElementById('navbar')?.style.setProperty('display', 'none', 'important')
  } else {
    document.body.style.overflow = 'auto'
    document.getElementById('navbar')?.style.removeProperty('display')
  }
})

onMounted(() => {
  // If the user presses strg + s, download the content as a markdown file
  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      downloadMarkdown()
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      downloadMarkdown()
    }
  })
})

function downloadMarkdown() {
  const blob = new Blob([content.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.title}.md`
  a.click()
  URL.revokeObjectURL(url)
}

function numberWithPoints(x: number) {
  if (!x) return 0
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function focusEditor() {
  editor.get()?.action((ctx: Ctx) => {
    ctx.get(editorViewCtx).dom.focus();
  });
}
</script>

<template>
  <div>
    <div class=" border-bandicoot-400 w-full flex items-center flex-col overflow-hidden"
      :class="{ 'fixed top-0 left-0 bottom-0 w-screen z-50 bg-white': fullscreen, 'relative h-full border-[1px] z-10': !fullscreen }">
      <div class="absolute bottom-2 left-2 bg-bandicoot-400 text-white shadow-lg p-2 rounded-md" title="Zeichenanzahl"
        :class="{ 'bg-red-400': contentLength > (props.maxLength || 0) || contentLength < (props.minLength || 0) }">
        {{ numberWithPoints(contentLength || 0) }} / {{
          numberWithPoints((props.maxLength || 0))
        }}
      </div>

      <div
        class="flex justify-between gap-5 py-2 px-3 text-bandicoot-400 border-b-[1px] border-bandicoot-400 w-full sticky top-0 left-0 right-0 bg-white">
        <div class="flex gap-2 flex-wrap">
          <button v-for="(item, index) in toolbar" :key="index" :title="item.title" @click.prevent="item.action"
            class="p-2 hover:bg-twine-100 rounded transition-all duration-300 ease-out">
            <component :is="item.icon" :size="16" />
          </button>
        </div>
        <div class="flex gap-2 h-fit">
          <button @click.prevent="downloadMarkdown" title="Download als Markdown-Datei"
            class="p-2 hover:bg-twine-100 rounded transition-all duration-300 ease-out">
            <Download :size="16" />
          </button>
          <button @click.prevent="fullscreen = !fullscreen" title="Vollbildmodus"
            class="p-2 hover:bg-twine-100 rounded transition-all duration-300 ease-out ">
            <Maximize2 v-if="!fullscreen" :size="16" />
            <Minimize2 v-else :size="16" />
          </button>
        </div>
      </div>

      <div @click="focusEditor" class="h-full overflow-y-scroll overflow-x-hidden w-full flex justify-center py-10">
        <div
          class="prose prose-amber px-5 font-serif w-full max-w-3xl border-none focus:border-none border-transparent outline-none whitespace-pre-wrap h-full">
          <h1 class="-mb-0">
            {{ props.title }}
          </h1>
          <hr class="m-0">
          <Milkdown id="milkdown" class="h-full" />
          <div :class="{ 'h-40': fullscreen, 'h-20': !fullscreen }"></div>
        </div>
      </div>

    </div>
  </div>
</template>