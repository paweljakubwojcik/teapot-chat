import { t } from '../trpc'
// import { z } from 'zod'
import type { Prisma } from '@teapot-chat/db'
import { SupabaseUser } from '../context'
import { TRPCError } from '@trpc/server'

const createUserFromOauthMetadata = ({
    id,
    user_metadata,
    email = '',
}: SupabaseUser): Prisma.UserCreateArgs['data'] => {
    return {
        id,
        username: user_metadata.name,
        email,
    }
}

const compare = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    return Object.entries(obj1).reduce((areTheSame, [key, value]) => {
        return areTheSame && Boolean(obj2[key] === value)
    }, true)
}

export const userRouter = t.router({
    me: t.procedure.query(async ({ ctx: { prisma, user } }) => {
        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                cause: 'no user in session',
            })
        }

        let dbUser = await prisma.user.findUnique({
            where: { id: user.id },
        })

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: createUserFromOauthMetadata(user),
            })
        }

        // if user from session have changed
        if (!compare(createUserFromOauthMetadata(user), dbUser)) {
            dbUser = await prisma.user.update({
                data: createUserFromOauthMetadata(user),
                where: {
                    id: user.id,
                },
            })
        }

        return dbUser
    }),
})
