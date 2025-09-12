"use client";

import { BasicInfo, AddressManagement, AccountSettings } from "./index";

export function UserInfoManage() {
  return (
    <div className="space-y-6">
      <BasicInfo />
      <AddressManagement />
      <AccountSettings />
    </div>
  );
}
