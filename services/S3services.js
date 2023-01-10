const AWS=require('aws-sdk');

const uploadToS3=(data,filename)=>{
    console.log('Data:',data)
  const BUCKET_NAME ='downloadexpensetracker';
  const IAM_USER_KEY ='AKIA5REMMAUSYABUS4UZ';
  const IAM_USER_SECRET ='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';
  
  let s3bucket = new AWS.S3({
    accesskeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET
   
  })
  
    var params={
      Bucket:BUCKET_NAME,
      Key:filename,
      Body:data,
      ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,s3response)=>{
        if(err){
          console.log('something went wrong',err)
          reject(err)
        }
        else{
          console.log('success',s3response)
         resolve(s3response.Location)
        }
      })
    
    })
   
  
  }
  module.exports={
    uploadToS3
  }