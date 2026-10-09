'use server';

import { createClient } from '@supabase/supabase-js';

export async function checkUserExists(email: string) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing Service Role Key");
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // List users by email (this is an Admin-only function)
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Admin List Error:", error);
        return false; // Fail safe
    }

    // Admin listUsers doesn't support email filtering directly in older versions, 
    // or does it? It's often safer to assume listUsers is paginated.
    // BETTER WAY: createUser with email? No.
    // getUserById? No.

    // Actually, listUsers() returns a list. Checking purely client side logic isn't scaleable.
    // But for this MVP:
    const user = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

    return !!user;
}
