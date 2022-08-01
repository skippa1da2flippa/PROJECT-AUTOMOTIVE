import { UserStatus } from '../database/user';

export interface FriendStatusChangedData {
    friendId: string;
    status: UserStatus;
}
