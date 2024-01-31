import { useRouter } from "next/router";
import useAlarm from "hooks/alarm/useAlarm";
import useReadAlarm from "hooks/alarm/useReadAlarm";
import useMyPartyInvite from "hooks/party/useMyPartyInvite";
import usePartyInviteApprove from "hooks/party/usePartyInviteApprove";
import usePartyInviteReject from "hooks/party/usePartyInviteReject";
import Check from "@/public/images/Check.png";

export default function AlarmPopover() {
  const router = useRouter();

  const { partyInvites } = useMyPartyInvite();
  const { partyInviteApprove } = usePartyInviteApprove();
  const { partyInviteReject } = usePartyInviteReject();

  const { alarms } = useAlarm();
  const { readAlarm } = useReadAlarm();

  const handleApproveClick = async (partyInviteId: number) => {
    await partyInviteApprove({ partyInviteId });
    router.push("/party");
  };

  const handleRejectClick = async (partyInviteId: number) => {
    await partyInviteReject({ partyInviteId });
  };

  return (
    <div className="flex flex-col gap-y-20">
      {partyInvites.map((partyInvite) => (
        <div key={`party-invite-${partyInvite.id}`} className="flex flex-col">
          <span className="text-14 text-gray-900">{`${partyInvite.partyName}에 초대되었습니다.`}</span>
          <div className="mt-15 flex w-full gap-x-8">
            <button
              className="w-full rounded-4 bg-gray-200 px-16 py-8"
              onClick={() => {
                handleApproveClick(partyInvite.id);
              }}
            >
              <span className="text-14 font-semibold text-gray-900">수락</span>
            </button>
            <button
              className="w-full rounded-4 bg-gray-200 px-16 py-8"
              onClick={() => {
                handleRejectClick(partyInvite.id);
              }}
            >
              <span className="text-14 font-semibold text-gray-900">거절</span>
            </button>
          </div>
        </div>
      ))}
      {alarms.map((alarm) => (
        <div key={`alarm-${alarm.id}`} className="flex">
          <p className="flex h-42 w-full items-center">{alarm.content}</p>
          <button
            className="flex shrink-0 items-center justify-center gap-x-4 px-4"
            onClick={() => {
              readAlarm({ alarmId: alarm.id });
            }}
          >
            <img src={Check.src} alt="check" width={16} height={16} />
            <span className="text-14 font-normal text-gray-400">읽음</span>
          </button>
        </div>
      ))}
      {partyInvites.length === 0 && alarms.length === 0 && (
        <span>표시할 알림이 없습니다.</span>
      )}
    </div>
  );
}
