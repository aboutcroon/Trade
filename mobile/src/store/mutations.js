const matutaions = {
  set_ActivePage(state, activePage) {   // 修改当前的activePage
    state.activePage = activePage
  },
  set_HideAll(state, hideAll) {         // 修改hideAll
    state.hideAll = hideAll
  },
  set_NewsType(state, newsType) {       // 修改新闻类型newsType
    state.newsType = newsType
  },
  set_HonorType(state, honorType) {       // 修改获奖者荣誉类型
    state.honorType = honorType
  },
  set_GuestsType(state, guestsType) {       // 修改重磅嘉宾类型
    state.guestsType = guestsType
  }
}

export default matutaions
