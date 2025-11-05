import type { CommentProps } from '@/components/Comment/comment.types.ts';

export interface CommentsSectionProps {
  comments: CommentProps[];
  onAddComment?: () => void;
  onSortComments?: () => void;
}
