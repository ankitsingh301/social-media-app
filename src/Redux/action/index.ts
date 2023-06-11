export function openCommentBox(id: string) {
  return {
    type: "SHOW_COMMENT_BOX",
    id,
  };
}

export function closeCommentBox() {
  return {
    type: "CLOSE_COMMENT_BOX",
  };
}

export function addTags(tags: any) {
  return {
    type: "ADD_TAG",
    tags,
  };
}

export function clearTag() {
  return {
    type: "CLEAR_TAG",
  };
}
