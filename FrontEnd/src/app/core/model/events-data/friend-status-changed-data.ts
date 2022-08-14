import { UserStatus } from '../response-data/user';

export interface FriendStatusChangedData {
    friendId: string;
    status: UserStatus;
}
