const GiftLog = Parse.Object.extend('GiftLog');

Parse.Cloud.define('send-gift-token', async req => {
  const { user, params } = req;
  const { userWallet } = params;
  if (!user) throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'User not found');
  if (!userWallet) throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'UserWallet not found');
  const giftQuery = new Parse.Query(GiftLog);
  giftQuery.equalTo('user', user);
  giftQuery.equalTo('userWallet', userWallet);
  giftQuery.ascending('createdAt');
  const lastUserGiftLog = await giftQuery.first({ useMasterKey: true });
  if (lastUserGiftLog) {
    const { createdAt } = lastUserGiftLog;
    const diff = new Date() - createdAt;
    if (diff < 1000 * 60 * 60 * 24) {
      throw new Parse.Error(Parse.Error.OTHER_CAUSE, 'You can send gift token once per day');
    }
  }
  const gift = new GiftLog();
  gift.set('user', user);
  gift.set('userWallet', userWallet);
  await gift.save({}, { useMasterKey: true });
  return { success: true };
})
