var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    isCheckAll: false,
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
    changeMoney: function(product,isMinus) {
      if(isMinus) {
        if(product.productQuantity == 1) {
          return
        }
        product.productQuantity--;
      }else {
        product.productQuantity++;
      }
    },
    selectProduct: function(product) {
      if(typeof(product.checked) == 'undefined') {
        // 对于没有在data属性中声明&不存在与对象中的变量,Vue无法监控该属性.
        // 在这种情况下, 我们可以:
        // 1. 全局注册
        // Vue.set(product, "checked", true);
        // 2. 局部注册
        this.$set(product, "checked", true)
      }else {
        product.checked = !product.checked;
      }
    },
    checkAllProduct: function(flag) {
      this.isCheckAll = flag
      var _this = this;
      this.productList.forEach(function(value,index) {
        if(typeof(value.checked) == 'undefined') {
          _this.$set(value, "checked", _this.isCheckAll);
        }else {
          value.checked = _this.isCheckAll;
        }
      });
    }
  },
})

// 全局过滤器, 我们可以将所有的全局过滤器放置到一个单独的filter.js中进行组织
Vue.filter("formatMoneyWithUnit", function(value,type) {
  return "￥" + value.toFixed(2) + type;
})
