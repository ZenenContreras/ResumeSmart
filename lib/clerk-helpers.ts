import { clerkClient } from '@clerk/nextjs/server';

export async function getUserFromClerk(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || 'unknown@email.com',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (error) {
    console.error('Error fetching user from Clerk:', error);
    return null;
  }
}
