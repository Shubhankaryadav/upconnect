import MetaTags from '@components/Common/MetaTags';
import Signup from '@components/Shared/Login/New';
import NotLoggedIn from '@components/Shared/NotLoggedIn';
import SettingsHelper from '@components/Shared/SettingsHelper';
import { APP_NAME } from '@hey/data/constants';
import { PAGEVIEW } from '@hey/data/tracking';
import { Card, GridItemEight, GridItemFour, GridLayout } from '@hey/ui';
import { Leafwatch } from '@lib/leafwatch';
import { t } from '@lingui/macro';
import type { NextPage } from 'next';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

const NewProfile: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'new-profile' });
  });

  if (!currentProfile) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={t`Create Profile • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsHelper
          heading="Create profile"
          description={t`Create new decentralized profile`}
        />
      </GridItemFour>
      <GridItemEight>
        <Card className="p-5">
          <Signup />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default NewProfile;
