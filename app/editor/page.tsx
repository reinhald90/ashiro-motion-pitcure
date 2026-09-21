import type { Metadata } from 'next';
import EditorShell from '@components/editor/EditorShell';

// ============================================
// Metadata
// ============================================
export const metadata: Metadata = {
  title: 'Editor',
  description:
    'Editor motion graphics dan video Ashiro. Keyframe, efek, dan export langsung dari browser.',
  robots: {
    index: false,
    follow: false,
  },
};

// ============================================
// Editor Page
// ============================================
export default function EditorPage() {
  return <EditorShell />;
}
