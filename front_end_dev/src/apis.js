let base_URL = "http://127.0.0.1:5000";

export function api_listCollections() {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/list_collections/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 "
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        resolve(JSON.parse(res).result);
      });
  });
  return async;
}

export function api_dropCollection(id) {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/drop_collection/", {
      method: "POST",
      headers: new Headers({  
        "Content-Type": "application/json;charset=UTF-8 "
      }),
      body: JSON.stringify({
        collection: id
      })
    }).then(res => {
      resolve(res.text());
    });
  });
  return async;
}

export function api_writeDocument(obj) {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/write_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 "
      }),
      body: JSON.stringify(obj)
    }).then(res => {
      resolve(res.text());
    });
  });
  return async;
}

export function api_getAllDocuments(coll) {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/get_all_documents/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 "
      }),
      body: JSON.stringify({
        collection: coll
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        resolve(JSON.parse(res).result);
      });
  });

  return async;
}

export function api_deleteDocument(obj) {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/delete_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 "
      }),
      body: JSON.stringify(obj)
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        resolve();
      });
  });
  return async;
}

export function api_generateRandomDocument(coll) {
  let async = new Promise((resolve, reject) => {
    fetch(base_URL + "/database/write_document/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8 "
      }),
      body: JSON.stringify({
        collection: coll,
        id: Math.random() * 1000000,
        des: "This entry is randomly generated"
      })
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        resolve(JSON.parse(res).result);
      });
  });
  return async;
}
