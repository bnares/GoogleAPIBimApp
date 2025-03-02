import {google} from "googleapis"
import { auth } from "./googleAuth/auth"
//Use the Readable from stream to create a streamable object required by the API
import { Readable } from "stream";

export default async (request : Request)=>{
  const data = await request.formData();
  const file = data.get("screenshot");

  // Very important to have a File so we can create an array buffer
	// And later a readable stream
  if(!(file instanceof File)) return;

  const drive = google.drive({
    version:'v3',
    auth
  });

  // The name can be anything, you can even use a uuid for simplicity
	// Make sure to get the folder id from the URL in Drive
  const requestBody = {
    name:"screenshot.jpeg",
    mimeType: "image/jpeg",
    parents:["1obkAsLrj61CO4ttAU8QkVvfDcqAAOaKr"]
  };

  // The API only works with a readable stream
	// So you have to create a buffer and then the stream
	// Remember to install the packages specially @types/node
  const buffer = await file.arrayBuffer();
  const _buffer = Buffer.from(buffer);
  const stream = Readable.from(_buffer);

  const media = {
    mimeType: "image/jpeg",
    body: stream
  };

  // Here we pass the request with the metadata of the image
	// And the media is the actual image
	// The fields is a key to request the return 
	// of a specific attribute of the image uploaded
  const response = await drive.files.create({
    requestBody,
    media,
    fields:"id"
  });

  const fileId = response.data.id;
  // eslint-disable-next-line consistent-return
  return new Response(JSON.stringify(fileId));
}