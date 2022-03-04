export enum SupabaseBucketName {
  avatar = "avatars",
}

export const BucketConfigurations: Record<
  SupabaseBucketName,
  { public: boolean }
> = {
  [SupabaseBucketName.avatar]: {
    public: false,
  },
};
