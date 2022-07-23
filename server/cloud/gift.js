const Gift = Parse.Object.extend('Gift');

Parse.Cloud.define('send-gift-token', async req => {
  const { user } = req;
  const giftQuery = new Parse.Query(Gift);
  giftQuery.equalTo('user', user);

})
