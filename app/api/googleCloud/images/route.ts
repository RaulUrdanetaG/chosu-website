import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { checkAdmin } from "@/lib/check-admin";

const gc = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!),
  projectId: "chosu-inventory",
});

export async function POST(req: Request) {
  const admin = await checkAdmin();
  const images = await req.formData();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!images) return new NextResponse("Images missing", { status: 400 });

  try {
    const resUrls: string[] = [];

    const uploadPromises = Array.from(images.entries()).map(
      async ([, file]) => {
        const currentFile = file as File;
        const fileUrl = await uploadFile(currentFile);
        resUrls.push(fileUrl);
      }
    );

    await Promise.all(uploadPromises);

    return NextResponse.json(resUrls);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function uploadFile(file: File) {
  const bucketName = "chosu-images";
  const chosuImagesBucket = gc.bucket(bucketName);
  const fileBuffer = await file.arrayBuffer();

  let publicUrl = "";

  try {
    // Check if it already exists in Google cloud
    const existingFile = chosuImagesBucket.file(file.name);
    const [exists] = await existingFile.exists();

    if (!exists) {
      // File does not exist, start uploading
      const fileName = file.name;
      const fileUpload = chosuImagesBucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.type,
        },
      });

      stream.end(Buffer.from(fileBuffer));

      // wait for process to end
      await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
      });

      publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    } else {
      // file already exists, add its url to the array
      publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    }

    return publicUrl;
  } catch (error) {
    console.log(error);
    return "";
  }
}
