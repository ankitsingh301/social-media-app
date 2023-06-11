const INITIALSTATE: any = {
  showCommentBox: [],
  tags: [],
};

const SocialMediaState = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case "SHOW_COMMENT_BOX":
      return { ...state, showCommentBox: { id: action.id } };
    case "CLOSE_COMMENT_BOX":
      return { ...state, showCommentBox: {} };
    case "ADD_TAG":
      return { ...state, tags: action.tags };
    case "CLEAR_TAG":
      return { ...state, tags: [] };
    default:
      return state;
  }
};
export default SocialMediaState;
