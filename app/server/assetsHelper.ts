import type { BgImgStore } from "@/globalStore";
import { getAssetsPublicIds } from "@/cloudinaryAssets";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export async function initBgImages(
  cloudName: string,
  imagePrefix: string,
  bgImgStoreInstance: BgImgStore,
): Promise<void> {
  const imgIds = await getAssetsPublicIds({ prefix: imagePrefix });
  bgImgStoreInstance.setImgIds(imgIds);

  const imgUrlMap = new Map<string, { default: string; small: string }>();
  const cld = new Cloudinary({ cloud: { cloudName } });

  for (const imgId of imgIds) {
    const defaultImg = cld
      .image(imgId)
      .format("auto")
      .resize(auto().gravity(autoGravity()));

    const smallImg = cld.image(imgId).format("auto").resize(scale().width(20));

    imgUrlMap.set(imgId, {
      default: defaultImg.toURL(),
      small: smallImg.toURL(),
    });
  }

  bgImgStoreInstance.setImgUrlMap(imgUrlMap);
}
