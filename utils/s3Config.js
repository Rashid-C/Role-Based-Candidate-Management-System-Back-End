
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${file.fieldname}-${Date.now()}.${fileExtension}`;
            const folder = file.fieldname === 'profilePicture' ? 'profiles' : 'resumes';
            cb(null, `${folder}/${fileName}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'profilePicture') {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Please upload an image file'), false);
            }
        } else if (file.fieldname === 'resume') {
            if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
                return cb(new Error('Please upload a PDF or Word document'), false);
            }
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

export default upload;