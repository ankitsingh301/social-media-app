import {
  ADD_TAG,
  CLEAR_TAG,
  CLOSE_COMMENT_BOX,
  SHOW_COMMENT_BOX,
} from "Redux/_contants/constant";

export function openCommentBox(id: string) {
  return {
    type: SHOW_COMMENT_BOX,
    id,
  };
}

export function closeCommentBox() {
  return {
    type: CLOSE_COMMENT_BOX,
  };
}

export function addTags(tags: any) {
  return {
    type: ADD_TAG,
    tags,
  };
}

export function clearTag() {
  return {
    type: CLEAR_TAG,
  };
}
