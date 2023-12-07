import AWS from "aws-sdk";
export default async function S3Upload(file) {
  //Set access keys
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });
  //create S3 object and set the bucket and region where data will be stored
  const s3 = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
  });

  //configure name and contents of data sent to bucket
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  //declare variable to create a PUT request of the S3 object  
  var upload = s3.putObject(params).promise();
  
  //
  await upload.then((err, data) => {
    console.log(err);
  });
}
