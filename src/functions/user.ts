// const userInfo = JSON.parse(localStorage.getItem("user")); // Local user info
import roles from "config/roles.json";

/**
 * Returns user as an object.
 * @return {object} User
 */
export function getUser(): object {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

interface Access {
  finalInspection?: boolean;
  finished?: boolean;
  itemEdit?: boolean;
  itemRead?: boolean;
  itemRepair?: boolean;
  itemWrite?: boolean;
  specs?: boolean;
}

/**
 * Returns access as an object combined with an optional customAccess.
 * @param {object} customAccess Custom permissions
 * @return {object} Access
 */
export function getAccess(customAccess: Access): Access {
  // TODO: Clean up indexing - seems to be a weird change in data structure that broke this function...
  let access: object = {};

  const user = getUser();

  try {
    const role = user["role"] && user["role"].toLowerCase();
    access = roles[role] && roles[role].access;
    if (customAccess) {
      access = { ...access, ...customAccess };
    }
  } catch (error) {
    alert(
      `User access failed with the following error:\n${error}\nPlease contact your administrator.`
    );
  }

  return access;
}
