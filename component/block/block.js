// component/block/block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '',
    },
    count: {
      type: Number,
      value: 0
    },
    hot_count: {
      type: Number,
      value: 0
    },
    
    movies:Array
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    format(url){
      console.log(url, '---------------')
      return `http://movies.kyriel.cn/${url}`
    },
    _more(){
      this.triggerEvent('more')
    },
    _select(e){
      console.log(e)
      const id = e.currentTarget.dataset.id
      this.triggerEvent('select',id)
    }
  }
})
