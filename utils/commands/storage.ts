import SupabaseStorage from "@ioc:Supabase/Storage";
import { SupabaseBucketName, BucketConfigurations } from "App/Utils/Supabase";

import type { Logger } from "./types";

export async function createStorageBuckets(logger: Logger) {
  logger.info("Creating apps storage buckets...");
  const bucketCreationPromises = Object.values(SupabaseBucketName).map(
    (bucketName) =>
      SupabaseStorage.createBucket(bucketName, BucketConfigurations[bucketName])
  );

  const bucketsNumber = bucketCreationPromises.length;

  try {
    const responses = await Promise.all(bucketCreationPromises);
    responses.forEach(({ data, error }, index) => {
      const currentBucket = `Bucket ${index + 1}/${bucketsNumber}`;

      if (data) {
        logger.success(`${currentBucket} (${data}) successfully created`);
      }

      if (error) {
        logger.error(
          `${currentBucket}, error when trying to create: ${error.message}`
        );
      }
    });
  } catch (e) {
    logger.error(`Error: ${e}`);
  }
}

export async function removeAllStorageBuckets(logger: Logger) {
  logger.info("Remove all storage buckets...");

  try {
    const { error: listBucketsError, data: buckets } =
      await SupabaseStorage.listBuckets();
    if (listBucketsError)
      return logger.error(
        `Error: Cannot list buckets: ${listBucketsError.message}`
      );

    const bucketsNumber = buckets?.length;
    if (!buckets || bucketsNumber == 0) {
      return logger.success("No buckets to delete !");
    }

    const deleteBucketPromises = buckets.map((bucket) =>
      SupabaseStorage.deleteBucket(bucket.id)
    );

    const responses = await Promise.all(deleteBucketPromises);
    responses.forEach(({ data, error }, index) => {
      const currentBucket = `Bucket ${index + 1}/${bucketsNumber}`;

      if (data) {
        logger.success(`${currentBucket} successfully deleted`);
      }

      if (error) {
        logger.error(
          `${currentBucket}, error when trying to delete: ${error.message}`
        );
      }
    });
  } catch (e) {
    logger.error(`Error: ${e}`);
  }
}
