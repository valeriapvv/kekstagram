class CommentsUploadButton {
  constructor({
    button,
    comments,
    shownCommentsCount,
    initialCommentsCount,
    addingCommentsCount,
    addComments,
  } = {}) {
    this.button = button;
    this.comments = comments;
    this.commentsCount = comments.length;
    this.shownCommentsCount = shownCommentsCount;
    this.addingCommentsCount = addingCommentsCount;
    this.initialCommentsCount = initialCommentsCount;
    this.addComments = addComments;
  }

  _onClick = () => {
    if (this.shownCommentsCount <= this.commentsCount) {
      const firstIndex = this.shownCommentsCount;
      const lastIndex = this.shownCommentsCount + this.addingCommentsCount;
      this.shownCommentsCount += this.addingCommentsCount;

      this.addComments(this.comments.slice(firstIndex, lastIndex));
      this.refreshState();
    }
  };

  refreshState = () => {
    this._setHiddenCommentsCount();

    if (this.hiddenCommentsCount <= 0) {
      this.setHidden();
      return;
    }

    if (this.shownCommentsCount <= this.initialCommentsCount) {
      this._setShown();
    }
  };

  _setHiddenCommentsCount = () => this.hiddenCommentsCount = this.commentsCount - this.shownCommentsCount;

  _setShown = () => {
    this.button.addEventListener('click', this._onClick);
    this.button.hidden = false;
  };

  setHidden = () => {
    this.button.removeEventListener('click', this._onClick);
    this.button.hidden = true;
  }
};

export {CommentsUploadButton};
