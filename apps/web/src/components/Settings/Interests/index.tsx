import MetaTags from '@components/Common/MetaTags';
import Interests from '@components/Settings/Interests/Interests';
import Beta from '@components/Shared/Badges/Beta';
import NotLoggedIn from '@components/Shared/NotLoggedIn';
import { APP_NAME } from '@hey/data/constants';
import { PAGEVIEW } from '@hey/data/tracking';
import { Card, GridItemEight, GridItemFour, GridLayout } from '@hey/ui';
import { Leafwatch } from '@lib/leafwatch';
import { t, Trans } from '@lingui/macro';
import type { NextPage } from 'next';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';

const InterestsSettings: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'settings', subpage: 'interests' });
  });

  if (!currentProfile) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={t`Interests settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="p-5">
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">
                <Trans>Select profile interests</Trans>
              </div>
              <Beta />
            </div>
            <p>
              <Trans>
                Interests you select are used to personalize your experience
                across {APP_NAME}. You can adjust your interests if something
                doesn't look right.
              </Trans>
            </p>
          </div>
          <div className="divider my-5" />
          <Interests />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default InterestsSettings;
