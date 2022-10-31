// src/server/router/context.ts
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '@acme/db'
import { createServerSupabaseClient, type User as _SupabaseUser } from '@supabase/auth-helpers-nextjs'

export type SupabaseUser = _SupabaseUser

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
    user: SupabaseUser | null
}

/** Use this helper for:
 *  - testing, where we don't have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 */
export const createContextInner = async (opts: CreateContextOptions) => {
    return {
        prisma,
        ...opts,
    }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
    const supabaseServerClient = createServerSupabaseClient({
        req: opts.req,
        res: opts.res,
    })

    const {
        data: { user },
    } = await supabaseServerClient.auth.getUser()

    return await createContextInner({
        user,
    })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
