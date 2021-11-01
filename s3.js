require('dotenv').config()
const fs= require ('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME 
const region = process.env.AWS_BUCKET_REGION
const accesKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_ACCESS_SECRET_KEY

const s3 = new S3({
    region,
    accesKeyId
    secretAccessKey
})
//uploads a file to s3 
function uploadFile(file) {
    const filestream = fs.createReadStream(file.path)

    const uploadParams = {
        bucketName: bucketName,
        body: filestream,
        key: file.filename,
    }

    return s3.upload(uploadParams).promise()

}
exports.uploadFile = uploadFile



//downloads a file from s3

