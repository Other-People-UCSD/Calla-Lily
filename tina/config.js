import { defineConfig } from "tinacms";
import { schema } from "./schema";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: '4b6a7219-a8a5-46e1-ba98-ffbdde530fb6', // Get this from tina.io
  token: '0bddb949c94207a21c5700e84d955c9d8fa16dcd', // Get this from tina.io

  build: {
    outputFolder: "production",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: schema,
});
