export type PermissionRequest = {
  permissions: chrome.permissions.Permissions;
  descriptions: {
    title: string;
    description: string;
  }[];
};

export const checkPermissions = async (): Promise<PermissionRequest> => {
  const permissions: PermissionRequest["permissions"]["permissions"] = [];
  const origins: PermissionRequest["permissions"]["origins"] = [];
  const descriptions: PermissionRequest["descriptions"] = [];

  // @ts-ignore
  const existingPermissions: chrome.permissions.Permissions =
    // @ts-ignore
    await chrome.permissions.getAll();

  if (!existingPermissions.permissions.includes("scripting")) {
    permissions.push("scripting");
    descriptions.push({
      title: "Scripting Access",
      description: "Load Canvas+ into your chosen websites. ",
    });
  }

  if (!existingPermissions.permissions.includes("webRequest")) {
    permissions.push("webRequest");
    descriptions.push({
      title: "Access to your Requests",
      description: "Load Canvas+ into your chosen websites. ",
    });
  }

  return {
    permissions: {
      permissions,
      origins,
    },
    descriptions,
  };
};
