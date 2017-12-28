var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
  },
  mounted: function() {
    // 由于使用mounted钩子无法保证实例已经被插入文档, 因此我们需要在钩子函数中包含$nextTick
    this.$nextTick(function() {
      this.cartView();
    });
  },
  // 局部过滤器
  filters: {
    formatMoney: function(value) {
      return "￥" + value.toFixed(2);
    }
  },
  methods: {
    cartView: function() {
      // then()方法声明当前面的函数执行加载完毕后, 再执行then()里面的代码
      this.$http.get("data/cartData.json").then(function(res) {
        this.productList = res.data.result.list;
        this.totalMoney = res.data.result.totalMoney;
      });
    },
  },
})

// 全局过滤器, 我们可以将所有的全局过滤器放置到一个单独的filter.js中进行组织
Vue.filter("formatMoneyWithUnit", function(value,type) {
  return "￥" + value.toFixed(2) + type;
})
