import { TicketIcon } from '@heroicons/react/24/outline';
import { INVITE } from '@hey/data/tracking';
import cn from '@hey/ui/cn';
import { Leafwatch } from '@lib/leafwatch';
import { Trans } from '@lingui/macro';
import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';

interface InvitesProps {
  className?: string;
}

const Invites: FC<InvitesProps> = ({ className = '' }) => {
  const setShowInvitesModal = useGlobalModalStateStore(
    (state) => state.setShowInvitesModal
  );

  return (
    <button
      className={cn(
        'flex w-full items-center space-x-1.5 px-2 py-1.5 text-left text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      onClick={() => {
        setShowInvitesModal(true);
        Leafwatch.track(INVITE.OPEN_INVITE);
      }}
    >
      <div>
        <TicketIcon className="h-4 w-4" />
      </div>
      <div>
        <Trans>Invites</Trans>
      </div>
    </button>
  );
};

export default Invites;
