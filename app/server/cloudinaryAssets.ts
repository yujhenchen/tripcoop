import cloudinary from "@/server/cloudinary";
import type { ResourceApiResponse } from "cloudinary";

export async function getAssetsPublicIds({
  resourceType = "image",
  type = "upload",
  prefix = "",
  maxResult = 30,
}: {
  resourceType?: string;
  type?: string;
  prefix?: string;
  maxResult?: number;
}): Promise<Array<string>> {
  try {
    const result: ResourceApiResponse = await cloudinary.api.resources({
      resource_type: resourceType,
      type,
      prefix,
      max_results: maxResult,
    });
    return result.resources.map((resource) => resource.public_id);
  } catch (error) {
    console.error(error);
    return [];
  }
}
