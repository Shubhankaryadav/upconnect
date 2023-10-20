import Loader from '@components/Shared/Loader';
import UserProfile from '@components/Shared/UserProfile';
import WalletProfile from '@components/Shared/WalletProfile';
import { UsersIcon } from '@heroicons/react/24/outline';
import { FollowUnfollowSource } from '@hey/data/tracking';
import type { FollowersRequest, Profile, Wallet } from '@hey/lens';
import { useFollowersQuery } from '@hey/lens';
import formatHandle from '@hey/lib/formatHandle';
import { EmptyState, ErrorMessage } from '@hey/ui';
import { t, Trans } from '@lingui/macro';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useAppStore } from 'src/store/app';

interface FollowersProps {
  profile: Profile;
}

const Followers: FC<FollowersProps> = ({ profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  // Variables
  const request: FollowersRequest = { profileId: profile?.id, limit: 50 };

  const { data, loading, error, fetchMore } = useFollowersQuery({
    variables: { request },
    skip: !profile?.id
  });

  const followers = data?.followers?.items;
  const pageInfo = data?.followers?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } }
    });
  };

  if (loading) {
    return <Loader message={t`Loading followers`} />;
  }

  if (followers?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{formatHandle(profile?.handle)}
            </span>
            <span>
              <Trans>doesn’t have any followers yet.</Trans>
            </span>
          </div>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto" data-testid="followers-modal">
      <ErrorMessage
        className="m-5"
        title={t`Failed to load followers`}
        error={error}
      />
      <Virtuoso
        className="virtual-profile-list"
        data={followers}
        endReached={onEndReached}
        itemContent={(index, follower) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {follower?.wallet?.defaultProfile ? (
                <UserProfile
                  profile={follower?.wallet?.defaultProfile as Profile}
                  isFollowing={follower?.wallet?.defaultProfile?.isFollowedByMe}
                  followUnfollowPosition={index + 1}
                  followUnfollowSource={FollowUnfollowSource.FOLLOWERS_MODAL}
                  showBio
                  showFollow={
                    currentProfile?.id !== follower?.wallet?.defaultProfile?.id
                  }
                  showUnfollow={
                    currentProfile?.id !== follower?.wallet?.defaultProfile?.id
                  }
                  showUserPreview={false}
                />
              ) : (
                <WalletProfile wallet={follower?.wallet as Wallet} />
              )}
            </motion.div>
          );
        }}
      />
    </div>
  );
};

export default Followers;
