/// <reference types="@sveltejs/kit" />

import type { PrismaClient } from "@prisma/client";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      prisma: PrismaClient;
    }
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
  }
}
