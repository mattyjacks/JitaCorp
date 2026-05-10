'use client'

import { useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[data-editor]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*?)$/gm, '<h3 className="text-lg font-bold">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 className="text-xl font-bold">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 className="text-2xl font-bold">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-teal hover:underline">$1</a>')
      .replace(/^- (.*?)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul className="list-disc list-inside">$1</ul>')
      .replace(/\n/g, '<br>')

    return html
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 border-b border-border flex flex-wrap gap-2">
        <button
          onClick={() => insertMarkdown('**', '**')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => insertMarkdown('*', '*')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => insertMarkdown('# ', '\n')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => insertMarkdown('## ', '\n')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => insertMarkdown('- ', '')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="List"
        >
          List
        </button>
        <button
          onClick={() => insertMarkdown('[', '](url)')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Link"
        >
          Link
        </button>
        <button
          onClick={() => insertMarkdown('![alt](', ')')}
          className="px-3 py-1 rounded text-sm font-semibold bg-white border border-border hover:bg-gray-100 transition"
          title="Image"
        >
          Image
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`px-3 py-1 rounded text-sm font-semibold ml-auto transition ${
            showPreview ? 'bg-teal text-white' : 'bg-white border border-border hover:bg-gray-100'
          }`}
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {showPreview ? (
        <div className="p-4 min-h-96 prose prose-sm max-w-none bg-white overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
        </div>
      ) : (
        <textarea
          data-editor
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Write your content here... (Markdown supported)'}
          className="w-full p-4 min-h-96 focus:outline-none font-mono text-sm resize-none"
        />
      )}
    </div>
  )
}
