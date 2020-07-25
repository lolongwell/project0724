let h = require('../request').default;

let cartAPI = {
  cartList(d) {
    let o = {
      gwc: {
        createBy: d.username
      },
      dataGrid: {
        field: 'id,goodsId,goodsMc,dj,sl,zj,zfzt,jssj,ddId,createBy,createName,createDate',
        page: 1,
        rows: 1000,
        order: 'desc',
        sort: 'createDate'
      }
    };
    o = JSON.stringify(o);
    return h.postJson(`rest/scGwcController/gwc_datagrid`, o);
  },
  addCart(d) {
    return h.postJson(`rest/scGwcController`, d);
  },

  updateCart(d) {
    return h.postJson(`rest/scGwcController/updateGwc`, d);
  },

  clearCart(d) {
    return h.postJson(`rest/scGwcController/deleteGwcByUser?createdBy=${d.createdBy}`, d);
  },

  deleteCartItem(id) {
    return h.postJson(`rest/scGwcController/delete?id=${id}`);
  },

  getUserAddress(
    d,
    p = {
      page: 1,
      size: 100
    }
  ) {
    return h.get(`rest/userAddressController/list/${p.page}/${p.size}`, true, false);
  }
};

export default cartAPI;
