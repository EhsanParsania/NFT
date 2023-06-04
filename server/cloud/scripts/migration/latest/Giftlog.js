const { ready, upsertSCHEMA } = require('../migration')
ready.dev(async (db) => {
    await upsertSCHEMA('GiftLog',
        {
            user: '*_User',
            userWallet: 'string',
        },
        [],
        {}
    )
})