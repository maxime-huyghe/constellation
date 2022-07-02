/// <reference types="@sveltejs/kit" />

import type { PrismaClient } from "@prisma/client";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      prisma: PrismaClient;
      user: { id: number; name: string; email: string } | undefined;
    }
    // interface Platform {}
    interface Session {
      user: { id: number; name: string; email: string } | null;
    }
    // interface Stuff {}
  }
}
