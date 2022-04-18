export type UserType = {
    userId?: string;
    name: string;
    avatarUrl: string;
    description: string;
    followings?: Array<string>
    followers?: Array<string>
}