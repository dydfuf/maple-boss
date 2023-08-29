import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useCreateParty from "hooks/party/useCreateParty";
import useParty from "hooks/party/useParty";
import useMyInfo from "hooks/user/useMyInfo";
import CreatePartyDialog from "./List/CreatePartyDialog";
import Crown from "@/public/images/Crown.png";
import Plus from "@/public/images/Plus.png";

export default function PartyListContent() {
  const { parties, refetch } = useParty();
  const { createParty } = useCreateParty();
  const { info } = useMyInfo();
  const { nickname } = info || { nickname: "" };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCreateParty = async (name: string, description: string) => {
    await createParty({ name, description });
    refetch();
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="mt-40 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <div
          className="flex h-158 w-full cursor-pointer items-center justify-center rounded-8 border-1 border-white-100 bg-gray-200"
          onClick={() => setDialogOpen(true)}
        >
          <div className="flex items-center gap-x-8">
            <Image
              src={Plus.src}
              width={16}
              height={16}
              alt="crown"
              className="h-16 w-16"
            />
            <span className="font-semibold text-gray-500">파티 생성</span>
          </div>
        </div>
        {parties?.map((party, idx) => (
          <Link
            key={`${party.name}-${idx}`}
            className="flex h-158 w-full flex-col rounded-8 border-1 border-white-100 p-20"
            href={`/party/${party.id}`}
          >
            <p className="mb-8 text-22 font-bold text-gray-900">{party.name}</p>
            <p className="text-14 text-gray-400">{party.description}</p>
            <div className="mt-auto flex gap-x-4">
              <p className="text-16 font-semibold text-gray-900">
                {party.leaderNickname}
              </p>
              {party.isLeader && (
                <Image src={Crown.src} width={16} height={16} alt="crown" />
              )}
            </div>
          </Link>
        ))}
      </div>
      <CreatePartyDialog nickName={nickname} onSubmit={handleCreateParty} />
    </Dialog.Root>
  );
}
