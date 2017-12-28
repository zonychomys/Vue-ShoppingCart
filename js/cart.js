var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
  },
  mounted: function() {
    this.cartView();
  },
  filters: {

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
