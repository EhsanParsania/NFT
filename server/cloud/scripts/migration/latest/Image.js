const { ready, upsertSCHEMA } = require('../migration')
ready.dev(async (db) => {
    await upsertSCHEMA('Image',
        {
            imageName: 'string',
            image: 'file',
        },
        [],
        {}
    )
})
