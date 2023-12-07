import AWS from "aws-sdk";

export default async function S3Delete(file) {
  //configure access keys
    AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });
  //create new S3 object
  const s3 = new AWS.S3();
  //configure paramaters to target specific file in S3 bucket
  const params = {Bucket: process.env.REACT_APP_S3_BUCKET, Key: file};
//API call to delete object
  s3.deleteObject(params, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("object deleted: " + file)
    }
  })
}
