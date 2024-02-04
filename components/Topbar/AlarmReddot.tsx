import useAlarm from "hooks/alarm/useAlarm";
import useMyPartyInvite from "hooks/party/useMyPartyInvite";

export default function AlarmReddot() {
  const { alarms } = useAlarm();
  const { partyInvites } = useMyPartyInvite();

  const hasAlarm = partyInvites.length > 0 || alarms.length > 0;

  return (
    <>
      {hasAlarm && (
        <div className="absolute right-0 top-0 h-12 w-12 rounded-full bg-error" />
      )}
    </>
  );
}
