export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/party",
    "/party/:partyId*",
    "/settlement",
    "/settlement/:partyId*",
    "/settlement/:partyId*/detail/:settlementId*",
    "/inquiry",
    "/inquiry/create",
    "/inquiry/:inquiryId*/detail",
  ],
};
