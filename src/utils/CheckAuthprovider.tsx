import { User } from "firebase/auth";

export const checkIfLinked = (user: User, providerId: string): number => {
  return user.providerData.findIndex(
    (provider) => provider.providerId === providerId
  );
};
