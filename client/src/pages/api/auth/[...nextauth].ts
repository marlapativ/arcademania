import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
providers: [
  CredentialsProvider({
    name: 'Sign In',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Username" },
      password: {  label: "Password", type: "password", placeholder: "Password" }
    },
    async authorize(credentials) {
      const res = await fetch("http://localhost:8080/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      if (res.ok && user) {
        return user
      }
      return null
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
  })
]
}

export default NextAuth(authOptions)