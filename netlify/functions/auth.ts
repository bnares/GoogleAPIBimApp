import { google } from "googleapis";

// Here is when the keyfile comes into play for the authentication
// There are multiple ways to do so, but this is the easiest one.
const auth = new google.auth.JWT({
  keyFile:"./bimslidepresentation-9d3ece2737b9.json",
  // Needed scopes to update slides, create and get files from drive
  scopes:[
    "<https://www.googleapis.com/auth/presentations>",
    "<https://www.googleapis.com/auth/drive>",
    "<https://www.googleapis.com/auth/drive.file>",
  ]
});

export {auth}