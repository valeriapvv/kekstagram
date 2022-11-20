class CommentsUploadButton {
  constructor({
    button,
    comments,
    shownCommentsCount,
    initialCommentsCount,
    addingCommentsCount,
    addComments,
  } = {}) {
    this._button = button;
    this._comments = comments;
    this._commentsCount = comments.length;
    this._shownCommentsCount = shownCommentsCount;
    this._addingCommentsCount = addingCommentsCount;
    this._initialCommentsCount = initialCommentsCount;
    this._addComments = addComments;
  }

  _onClick = () => {
    if (this._shownCommentsCount <= this._commentsCount) {
      const firstIndex = this._shownCommentsCount;
      const lastIndex = firstIndex + this._addingCommentsCount;
      this._shownCommentsCount = lastIndex;

      this._addComments(this._comments.slice(firstIndex, lastIndex));
      this.refreshState();
    }
  };

  refreshState = () => {
    this._setHiddenCommentsCount();

    if (this._hiddenCommentsCount <= 0) {
      this.setHidden();
      return;
    }

    if (this._shownCommentsCount <= this._initialCommentsCount) {
      this._setShown();
    }
  };

  _setHiddenCommentsCount = () => this._hiddenCommentsCount = this._commentsCount - this._shownCommentsCount;

  _setShown = () => {
    this._button.addEventListener('click', this._onClick);
    this._button.hidden = false;
  };

  setHidden = () => {
    this._button.removeEventListener('click', this._onClick);
    this._button.hidden = true;
  }
};

export {CommentsUploadButton};
