export async function getAssetsPublicIds(options?: {
  resourceType?: string;
  type?: string;
  prefix?: string;
  maxResult?: number;
}): Promise<Array<string>> {
  const {
    resourceType = "image",
    type = "upload",
    prefix = "",
    maxResult = 30,
  } = options || {};

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "cloud_name";
  const apiKey = process.env.CLOUDINARY_API_KEY ?? "api_key";
  const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "api_secret";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}?type=${type}&prefix=${encodeURIComponent(prefix)}&max_results=${maxResult}`;
  const auth = btoa(`${apiKey}:${apiSecret}`);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    if (!res.ok) throw new Error(`Cloudinary API error: ${res.status}`);
    const result = await res.json();
    return (result.resources || []).map((resource: any) => resource.public_id);
  } catch (error) {
    console.error(error);
    return [];
  }
}
