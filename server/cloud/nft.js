Parse.Cloud.define("upload-image", async (request) => {
    const { name, data } = request.params;
    const file = new Parse.File(name, { base64: data });
    await file.save();
    return file;
});