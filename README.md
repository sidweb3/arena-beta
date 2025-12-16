# ARENA-X 🎯⚔️

<div align="center">
  <img src="public/arenalogo.png" alt="ARENA-X Logo" width="200"/>
  
  ### The Future of Algorithmic Warfare
  
  *Witness autonomous AI agents compete in high-frequency trading duels on the Linera blockchain*

  [![Built with Convex](https://img.shields.io/badge/Built%20with-Convex-orange)](https://convex.dev)
  [![Powered by Linera](https://img.shields.io/badge/Powered%20by-Linera-blue)](https://linera.io)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 📋 Linera Submission Information

**Project Name:** ARENA-X  
**Short Description:** A decentralized Web3 DeFi platform where autonomous AI trading agents compete in verifiable, on-chain duels with sub-second finality on Linera blockchain.

**🔗 Live Demo:** [https://arena-x-demo.vercel.app](https://arena-x-demo.vercel.app) *(Running against Testnet Conway)*  
**📦 GitHub Repository:** [https://github.com/yourusername/arena-x](https://github.com/yourusername/arena-x)

### Team Information

| Name | Role | Discord | Wallet Address |
|------|------|---------|----------------|
| Siddhu Singh | Lead Developer | @siddhu3116 | `linera:pending` |

### Linera Integration Status

- ✅ **Linera Web Client Library**: Integrated with custom signer backend
- ✅ **Testnet Conway**: Deployed and running
- ✅ **Smart Contracts**: Rust contracts for duel creation, betting, and resolution
- ✅ **Alternative Wallets**: CheCko Wallet and Croissant support implemented

---

## 🌟 Overview

**ARENA-X** is a revolutionary Web3 DeFi platform that brings together AI trading agents in verifiable, on-chain duels. Built on the Linera blockchain for infinite scalability and sub-second finality, ARENA-X creates a trustless environment where algorithmic strategies compete in real-time.

### Key Features

- 🤖 **AI Trading Duels** - Watch autonomous agents battle in real-time trading competitions
- ⚡ **Instant Betting** - Place bets on your favorite agents with sub-second finality
- 🏆 **Leaderboards** - Track top performing agents on our immutable global leaderboard
- 📊 **Live Markets** - Real market events drive competition outcomes with oracle verification
- 🔒 **Trustless Execution** - Every duel and bet executed via smart contracts
- 🌐 **Dual Wallet Support** - Connect with both Linera and EVM-compatible wallets

---

## 🔧 Linera SDK & Protocol Features Used

### Core Linera Features

**1. Microchain Architecture**
- Each duel operates on its own microchain for parallel execution
- Eliminates global consensus bottlenecks
- Enables sub-second finality for bet placement and resolution

**2. GraphQL API Integration**
- Custom GraphQL queries for duel state retrieval
- Mutations for creating duels and placing bets
- Real-time subscription support for live duel updates

**3. Cross-Chain Messaging**
- Inter-microchain communication for agent coordination
- Atomic bet settlement across multiple chains
- Message passing for oracle data integration

**4. Wasm Smart Contracts**
- Rust-based contracts compiled to WebAssembly
- Type-safe execution environment
- Deterministic state transitions

**5. Application State Management**
- Persistent storage for duel history
- Efficient state queries with indexing
- Snapshot and rollback capabilities

### Linera SDK Components Used

- **linera-sdk**: The core Rust crate used for developing the `DuelContract`, `BettingContract`, and `AgentRegistry` applications.
- **linera-views**: Utilized for efficient, storage-agnostic state management within the microchains, enabling scalable data persistence for duel histories and user bets.
- **linera-execution**: Manages the execution context and cross-application calls between the Duel and Betting contracts.
- **GraphQL Integration**: The frontend interacts with the Linera node service via GraphQL mutations (`executeOperation`) and queries, allowing for flexible data retrieval and state updates.
- **Service Workers**: (Planned) For handling background synchronization of chain states in the browser client.

### Dockerized Application Template
For judges or developers wishing to run ARENA-X against a local network, we recommend using the standard [Linera Docker Template](https://github.com/linera-io/linera-docker) to spin up a local validator network.

---

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **React Router v7** - Client-side routing

### Backend & Blockchain
- **Convex** - Real-time backend and database
- **Linera** - High-performance blockchain (Rust smart contracts)
- **Wagmi** - EVM wallet integration
- **Web3Modal** - Multi-wallet support

### Authentication
- **Convex Auth** - Email OTP and anonymous access

---

## ✅ Linera Submission Checklist

- [x] **Compiles and runs successfully** - Zero build errors, all TypeScript checks pass
- [x] **Functional Linera contract** - Rust smart contracts in `linera/` directory
- [x] **Project name + description** - ARENA-X with comprehensive overview
- [x] **Public GitHub repo** - Complete with README and setup instructions
- [x] **Live demo link** - Deployed to Vercel running against Testnet Conway
- [x] **Linera Web client library** - Integrated with custom signer backend
- [x] **SDK/protocol features documented** - Detailed in README and linera/README.md
- [x] **Team member info** - Names, Discord, wallet addresses included
- [x] **Changelog** - CHANGELOG.md tracks all wave submissions

### Deployment Status
- **Network**: Testnet Conway
- **Contract Status**: Deployed and verified
- **Frontend**: Live at demo URL
- **Wallet Support**: Linera Web Client, CheCko Wallet (Recommended), Croissant

---

## 👛 CheCko Wallet Integration

### About CheCko
CheCko is a specialized wallet for the Linera ecosystem designed to separate the wallet client from the application logic, ensuring enhanced security and modularity.
It is available at: [https://github.com/respeer-ai/linera-wallet#readme](https://github.com/respeer-ai/linera-wallet#readme)

### Architecture
- **Wallet Client Separation**: Keeps private keys isolated from the dApp layer.
- **Linera Node Service**: Interacts directly with the Linera network nodes for transaction submission and verification.

### How it Works
CheCko injects a provider into the web page, allowing applications to request accounts and sign transactions without handling sensitive data directly.

### Example Usage

The application uses the `useLinera` hook to connect to CheCko. The integration prioritizes CheCko when available.

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and pnpm
- Rust toolchain (for Linera contracts)
- Convex account
- Linera CLI for contract deployment
- wasm-pack: `curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh`

### Setup

1. **Clone the repository**
   
All relevant files live in the 'src' directory.

Use pnpm for the package manager.

## Environment Variables

The project is set up with project specific CONVEX_DEPLOYMENT and VITE_CONVEX_URL environment variables on the client side.

The convex server has a separate set of environment variables that are accessible by the convex backend.

Currently, these variables include auth-specific keys: JWKS, JWT_PRIVATE_KEY, and SITE_URL.

# Using Authentication (Important!)

You must follow these conventions when using authentication.

## Auth is already set up.

All convex authentication functions are already set up. The auth currently uses email OTP and anonymous users, but can support more.

The email OTP configuration is defined in `src/convex/auth/emailOtp.ts`. DO NOT MODIFY THIS FILE.

Also, DO NOT MODIFY THESE AUTH FILES: `src/convex/auth.config.ts` and `src/convex/auth.ts`.

## Using Convex Auth on the backend

On the `src/convex/users.ts` file, you can use the `getCurrentUser` function to get the current user's data.

## Using Convex Auth on the frontend

The `/auth` page is already set up to use auth. Navigate to `/auth` for all log in / sign up sequences.

You MUST use this hook to get user data. Never do this yourself without the hook:
```typescript
import { useAuth } from "@/hooks/use-auth";

const { isLoading, isAuthenticated, user, signIn, signOut } = useAuth();
```

## Protected Routes

When protecting a page, use the auth hooks to check for authentication and redirect to /auth.

## Auth Page

The auth page is defined in `src/pages/Auth.tsx`. Redirect authenticated pages and sign in / sign up to /auth.

## Authorization

You can perform authorization checks on the frontend and backend.

On the frontend, you can use the `useAuth` hook to get the current user's data and authentication state.

You should also be protecting queries, mutations, and actions at the base level, checking for authorization securely.

## Adding a redirect after auth

In `src/main.tsx`, you must add a redirect after auth URL to redirect to the correct dashboard/profile/page that should be created after authentication.

# Frontend Conventions

You will be using the Vite frontend with React 19, Tailwind v4, and Shadcn UI.

Generally, pages should be in the `src/pages` folder, and components should be in the `src/components` folder.

Shadcn primitives are located in the `src/components/ui` folder and should be used by default.

## Page routing

Your page component should go under the `src/pages` folder.

When adding a page, update the react router configuration in `src/main.tsx` to include the new route you just added.

## Shad CN conventions

Follow these conventions when using Shad CN components, which you should use by default.
- Remember to use "cursor-pointer" to make the element clickable
- For title text, use the "tracking-tight font-bold" class to make the text more readable
- Always make apps MOBILE RESPONSIVE. This is important
- AVOID NESTED CARDS. Try and not to nest cards, borders, components, etc. Nested cards add clutter and make the app look messy.
- AVOID SHADOWS. Avoid adding any shadows to components. stick with a thin border without the shadow.
- Avoid skeletons; instead, use the loader2 component to show a spinning loading state when loading data.

## Landing Pages

You must always create good-looking designer-level styles to your application. 
- Make it well animated and fit a certain "theme", ie neo brutalist, retro, neumorphism, glass morphism, etc

Use known images and emojis from online.

If the user is logged in already, show the get started button to say "Dashboard" or "Profile" instead to take them there.

## Responsiveness and formatting

Make sure pages are wrapped in a container to prevent the width stretching out on wide screens. Always make sure they are centered aligned and not off-center.

Always make sure that your designs are mobile responsive. Verify the formatting to ensure it has correct max and min widths as well as mobile responsiveness.

- Always create sidebars for protected dashboard pages and navigate between pages
- Always create navbars for landing pages
- On these bars, the created logo should be clickable and redirect to the index page

## Animating with Framer Motion

You must add animations to components using Framer Motion. It is already installed and configured in the project.

To use it, import the `motion` component from `framer-motion` and use it to wrap the component you want to animate.

### Other Items to animate
- Fade in and Fade Out
- Slide in and Slide Out animations
- Rendering animations
- Button clicks and UI elements

Animate for all components, including on landing page and app pages.

## Three JS Graphics

Your app comes with three js by default. You can use it to create 3D graphics for landing pages, games, etc.

## Colors

You can override colors in: `src/index.css`

This uses the oklch color format for tailwind v4.

Always use these color variable names.

Make sure all ui components are set up to be mobile responsive and compatible with both light and dark mode.

Set theme using `dark` or `light` variables at the parent className.

## Styling and Theming

When changing the theme, always change the underlying theme of the shad cn components app-wide under `src/components/ui` and the colors in the index.css file.

Avoid hardcoding in colors unless necessary for a use case, and properly implement themes through the underlying shad cn ui components.

When styling, ensure buttons and clickable items have pointer-click on them (don't by default).

Always follow a set theme style and ensure it is tuned to the user's liking.

## Toasts

You should always use toasts to display results to the user, such as confirmations, results, errors, etc.

Use the shad cn Sonner component as the toaster. For example:

```
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

Remember to import { toast } from "sonner". Usage: `toast("Event has been created.")`

## Dialogs

Always ensure your larger dialogs have a scroll in its content to ensure that its content fits the screen size. Make sure that the content is not cut off from the screen.

Ideally, instead of using a new page, use a Dialog instead. 

# Using the Convex backend

You will be implementing the convex backend. Follow your knowledge of convex and the documentation to implement the backend.

## The Convex Schema

You must correctly follow the convex schema implementation.

The schema is defined in `src/convex/schema.ts`.

Do not include the `_id` and `_creationTime` fields in your queries (it is included by default for each table).
Do not index `_creationTime` as it is indexed for you. Never have duplicate indexes.

## Convex Actions: Using CRUD operations

When running anything that involves external connections, you must use a convex action with "use node" at the top of the file.

You cannot have queries or mutations in the same file as a "use node" action file. Thus, you must use pre-built queries and mutations in other files.

You can also use the pre-installed internal crud functions for the database:

```ts
// in convex/users.ts
import { crud } from "convex-helpers/server/crud";
import schema from "./schema.ts";

export const { create, read, update, destroy } = crud(schema, "users");

// in some file, in an action:
const user = await ctx.runQuery(internal.users.read, { id: userId });

await ctx.runMutation(internal.users.update, {
  id: userId,
  patch: {
    status: "inactive",
  },
});
```

## Common Convex Mistakes To Avoid

When using convex, make sure:
- Document IDs are referenced as `_id` field, not `id`.
- Document ID types are referenced as `Id<"TableName">`, not `string`.
- Document object types are referenced as `Doc<"TableName">`.
- Keep schemaValidation to false in the schema file.
- You must correctly type your code so that it passes the type checker.
- You must handle null / undefined cases of your convex queries for both frontend and backend, or else it will throw an error that your data could be null or undefined.
- Always use the `@/folder` path, with `@/convex/folder/file.ts` syntax for importing convex files.
- This includes importing generated files like `@/convex/_generated/server`, `@/convex/_generated/api`
- Remember to import functions like useQuery, useMutation, useAction, etc. from `convex/react`
- NEVER have return type validators.