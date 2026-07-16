import NextAuth from "next-auth";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // PrismaAdapter removed — JWT strategy doesn't need it and it conflicts
  // with Credentials by attempting extra DB calls after authorize()
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
          });

          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) return null;

          const { email, password } = parsed.data;

          const user = await db.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              hashedPassword: true,
              role: true,
              image: true,
              isActive: true,
            },
          });

          if (!user || !user.hashedPassword) return null;
          if (!user.isActive) return null;

          const isValid = await compare(password, user.hashedPassword);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error("[auth] authorize error:", error);
          return null;
        }
      },
    }),
  ],
});
