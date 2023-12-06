import AWS from "aws-sdk";
export default async function S3Upload(file) {
 
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });
  
  const s3 = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
  });
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  var upload = s3
    .putObject(params).promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File Uploaded Successfully");
  });
}
