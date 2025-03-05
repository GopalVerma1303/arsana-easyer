import { createEventHandler } from "@cloudflare/next-on-pages/edge"

// The event handler for handling all incoming requests
export default createEventHandler({
  // Optional: Specify the path to your Next.js app build output
  buildOutputDirectory: ".next",
})

