new Vue({
  el: '.address',
  data: {
    addressList: [],
    limitAddressNum: 3,
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    limitAddress: function() {
      return this.addressList.slice(0,this.limitAddressNum);
    },
  },
  filters: {
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get("data/address.json").then(function(res) {
        _this.addressList = res.data.result;
      });
    }
  },
})
