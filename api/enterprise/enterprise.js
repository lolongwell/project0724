let h = require('../request').default;

let EnterpriseAPI = {
  getEnterpriseUser(id) {
    let o = {
      qyuser: {
        kid: id
      },
      dataGrid: {
        page: 1,
        rows: 1000,
        order: 'desc',
        sort: 'createDate'
      }
    };
    o = JSON.stringify(o);
    return h.postJson(`rest/scQyController/qyuser_datagrid`, o);
  },
  deleteUser(id) {
    return h.postJson(`rest/scQyController/deleteQyUser?id=${id}`);
  },
  updateCustom(t, d) {
    let o = {
      id: d[0].qyId
    };
    if (t == 'dz') {
      o.scQydzList = d;
    } else {
      o.scQyggList = d;
    }
    o = JSON.stringify(o);
    return h.postJson(`rest/scQyController/create`, o);
  },
  getQyInfo(id) {
    return h.postJson(`rest/scQyController/getQyObjByQyId?kid=${id}`);
  },
  uplad(d) {
    return h.postJson(``);
  }
};

export default EnterpriseAPI;
