import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';

const s3Client = new S3Client({
  region: 'sa-east-1', // Defina a região desejada
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const uploadFileToS3 = async (file: any) => {
  const fileExtension = getFileExtension(file.data.name);
  const keyWithPath = `sounds/${encodeURIComponent(file.title)}.${fileExtension}`;

  const buffer = Buffer.from(file.data.data, 'base64'); // Decodifique a string base64 em um buffer
  const dataArray = new Uint8Array(buffer);

  const putParams = {
    Bucket: "musfy",
    Key: keyWithPath,
    Body: dataArray,
    ContentType: "audio/mpeg"
  };

  try {
    const command = new PutObjectCommand(putParams);
    await s3Client.send(command);

    // Construa a URL do objeto enviado
    const objectUrl = `https://${putParams.Bucket}.s3.sa-east-1.amazonaws.com/${keyWithPath}`;
    
    console.log("Arquivo enviado com sucesso:", objectUrl);
    return objectUrl;
  } catch (error) {
    console.error("Erro ao enviar arquivo para o S3:", error);
    throw error;
  }
};

// Função para obter a extensão do arquivo
const getFileExtension = (filename: string) => {
  return filename.split(".").pop();
};

const deleteFileFromS3 = async (fileName: string) => {
  const params = {
    Bucket: 'musfy',
    Key: fileName,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    
    console.log('Arquivo deletado com sucesso:', fileName);
  } catch (error) {
    console.error('Erro ao deletar arquivo do S3:', error);
    throw error;
  }
};

async function uploadImageToS3(file: any) {
  const fileExtension = getFileExtension(file.data.name);
  const keyWithPath = `soundImages/${encodeURIComponent(file.title)}.${fileExtension}`;

  const buffer = Buffer.from(file.data.data, 'base64'); // Decodifique a string base64 em um buffer
  const dataArray = new Uint8Array(buffer);

  const putParams = {
    Bucket: "musfy",
    Key: keyWithPath,
    Body: dataArray,
  };

  try {
    const command = new PutObjectCommand(putParams);
    await s3Client.send(command);

    // Construa a URL do objeto enviado
    const objectUrl = `https://${putParams.Bucket}.s3.sa-east-1.amazonaws.com/${keyWithPath}`;
    
    console.log("Arquivo enviado com sucesso:", objectUrl);
    return objectUrl;
  } catch (error) {
    console.error("Erro ao enviar arquivo para o S3:", error);
    throw error;
  }
}

export { uploadFileToS3, deleteFileFromS3, uploadImageToS3 }