import { NextResponse } from 'next/server';

import { prisma } from '@/services/prisma';

import type { WebhookEvent } from '@clerk/nextjs/server';

// Clerk Webhook: create or delete a user in the database by Clerk ID
export async function POST(req: Request) {
  try {
    // Parse the Clerk Webhook event
    const evt = (await req.json()) as WebhookEvent;

    const { id: clerkUserId } = evt.data;

    if (!clerkUserId) {
      console.error('No user ID provided');
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    // Create or delete a user in the database based on the Clerk Webhook event
    let user = null;
    switch (evt.type) {
      case 'user.created': {
        const email = evt.data.email_addresses.find(
          (address) => address.id === evt.data.primary_email_address_id
        )?.email_address;

        console.log('evt data', evt.data);
        console.log('email', email);

        if (!email) {
          return NextResponse.json({ error: 'No email address provided' }, { status: 400 });
        }

        user = await prisma.user.upsert({
          where: {
            clerkUserId,
          },
          update: {
            clerkUserId,
          },
          create: {
            clerkUserId,
            email,
            name: `${evt.data.first_name} ${evt.data.last_name}`.trim(),
          },
        });
        break;
      }
      case 'user.deleted': {
        user = await prisma.user.delete({
          where: {
            clerkUserId,
          },
        });
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
