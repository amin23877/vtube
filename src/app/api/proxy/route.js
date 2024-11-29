import https from "https";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const encodedUrl = searchParams.get("url");

  if (!encodedUrl) {
    console.error("Error: Missing video URL");
    return new Response("Missing video URL", { status: 400 });
  }

  const url = decodeURIComponent(encodedUrl);
  console.log("Decoded Video URL:", url);

  try {
    return new Promise((resolve, reject) => {
      https
        .get(url, (videoRes) => {
          console.log("Video Response Status:", videoRes.statusCode);

          if (videoRes.statusCode !== 200) {
            console.error("Failed to fetch video:", videoRes.statusCode);
            return reject(
              new Response("Failed to fetch video", {
                status: videoRes.statusCode,
              })
            );
          }

          const body = new ReadableStream({
            start(controller) {
              videoRes.on("data", (chunk) => controller.enqueue(chunk));
              videoRes.on("end", () => controller.close());
              videoRes.on("error", (err) => {
                console.error("Stream Error:", err);
                controller.error(err);
              });
            },
          });

          resolve(
            new Response(body, {
              status: 200,
              headers: {
                "Content-Type":
                  videoRes.headers["content-type"] ||
                  "application/octet-stream",
                "Content-Length": videoRes.headers["content-length"] || "0",
              },
            })
          );
        })
        .on("error", (err) => {
          console.error("HTTPS Request Error:", err);
          reject(new Response("Failed to proxy the video", { status: 500 }));
        });
    });
  } catch (err) {
    console.error("Server Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
