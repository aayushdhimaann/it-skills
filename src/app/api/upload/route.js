import { NextResponse } from "next/server"; // Assuming you're using Next.js
import { v4 as uuidv4 } from "uuid";
import { bucket } from "../../../config/firebase-admin"; // Import bucket from firebase-admin.js

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();

    // Access the file
    const file = formData.get("photo");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    if (fileSizeInMB > 2) {
      return NextResponse.json(
        { error: "File size exceeds 2 MB limit" },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileName = `${uuidv4()}_${file.name}`;

    // Create a Firebase Storage file reference
    const firebaseFile = bucket.file(fileName);

    // Metadata for Firebase storage
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
      contentType: file.mimetype,
    };

    // Upload the file to Firebase Storage
    const stream = firebaseFile.createWriteStream({
      metadata: metadata,
      gzip: true,
    });

    // Pipe the file data into the storage
    stream.end(Buffer.from(await file.arrayBuffer())); // Make sure to pipe the file data

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    await firebaseFile.makePublic();
    // Get the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Send a success response with the file URL
    return NextResponse.json({
      message: "File uploaded successfully",
      fileUrl: publicUrl,
    });
  } catch (error) {
    console.error("Error in upload:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
