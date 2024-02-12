import { useRouter } from "next/router";
import Button from "components/common/Button";
import Text from "components/common/Text";
import useAlarm, { Alarm } from "hooks/alarm/useAlarm";
import useReadAlarm from "hooks/alarm/useReadAlarm";
import useMyPartyInvite, { PartyInvite } from "hooks/party/useMyPartyInvite";
import usePartyInviteApprove from "hooks/party/usePartyInviteApprove";
import usePartyInviteReject from "hooks/party/usePartyInviteReject";
import { cn } from "utils/common";
import CloseIcon from "./CloseIcon";
import { PopoverClose, PopoverContent } from ".";

export default function AlarmPopoverContent() {
  const router = useRouter();

  const { partyInvites } = useMyPartyInvite();
  const { partyInviteApprove } = usePartyInviteApprove();
  const { partyInviteReject } = usePartyInviteReject();

  const { alarms } = useAlarm();
  const { readAlarm } = useReadAlarm();

  const hasAlarm = partyInvites.length > 0 || alarms.length > 0;

  const handleApproveClick = async (partyInviteId: number) => {
    await partyInviteApprove({ partyInviteId });
    router.push("/party");
  };

  const handleRejectClick = async (partyInviteId: number) => {
    await partyInviteReject({ partyInviteId });
  };

  return (
    <PopoverContent className={cn({ "pt-10": hasAlarm })}>
      <PopoverClose>
        <CloseIcon />
      </PopoverClose>
      {hasAlarm && (
        <Text size={4} className="mr-auto pb-10 font-bold">
          알림
        </Text>
      )}
      {partyInvites.map((partyInvite) => (
        <PartyInviteItem
          key={`party-invite-item-${partyInvite.id}`}
          partyInvite={partyInvite}
          handleApproveClick={handleApproveClick}
          handleRejectClick={handleRejectClick}
        />
      ))}
      {alarms.map((alarm) => (
        <AlarmItem
          key={`alarm-item-${alarm.id}`}
          alarm={alarm}
          handleAlarmRead={readAlarm}
        />
      ))}
      {!hasAlarm && (
        <Text size={2} className="text-center">
          표시할 알림이 <br />
          없습니다.
        </Text>
      )}
    </PopoverContent>
  );
}

interface PartyInviteItemProps {
  partyInvite: PartyInvite;
  handleApproveClick: (partyInviteId: number) => void;
  handleRejectClick: (partyInviteId: number) => void;
}
function PartyInviteItem({
  partyInvite,
  handleApproveClick,
  handleRejectClick,
}: PartyInviteItemProps) {
  const { partyName, id } = partyInvite;
  return (
    <div className="flex w-300 flex-col">
      <Text size={2}>{`${partyName}에 초대되었습니다.`}</Text>
      <div className="mt-10 flex w-full space-x-8">
        <Button label="수락" onClick={() => handleApproveClick(id)} />
        <Button label="거절" onClick={() => handleRejectClick(id)} />
      </div>
    </div>
  );
}

interface AlarmItemProps {
  alarm: Alarm;
  handleAlarmRead: ({ alarmId }: { alarmId: number }) => void;
}
function AlarmItem({ alarm, handleAlarmRead }: AlarmItemProps) {
  const { content, id } = alarm;
  return (
    <div className="flex items-center gap-x-4 px-20 py-16">
      <Text size={2}>{content}</Text>
      <Button label="읽음" onClick={() => handleAlarmRead({ alarmId: id })} />
    </div>
  );
}
