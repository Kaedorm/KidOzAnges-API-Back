require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accesKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accesKeyId,
    secretAccessKey
})
//uploads a file to s3 
function uploadFile(file) { 
    try {
        const filestream = fs.createReadStream(file.path);
        //console.log(filestream, "xxxxxxxxxxxxx");
        const uploadParams = {
            Bucket: bucketName,
            Body: filestream,
            Key: file.filename,
        }

        return s3.upload(uploadParams).promise()
    } catch (error) {
       throw new Error(`S3 upload error: ${error.message}`)
    }

};
exports.uploadFile = uploadFile;


// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
};
exports.getFileStream = getFileStream;