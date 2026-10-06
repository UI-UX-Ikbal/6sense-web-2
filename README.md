This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Service pages

Every page under `/services/<slug>` is data-driven. `app/services/[slug]/page.tsx` looks the slug up in
`content/services/index.ts` and renders `components/services/ServicePageTemplate` (hero + ordered
sections); slugs with no content yet fall back to a placeholder. Static params and metadata come from the
same registry.

**Adding a service page** takes three steps and no JSX:

1. Create `content/services/<name>.ts` exporting a `ServicePageContent` (`satisfies ServicePageContent`).
   `energy-software.ts` is the reference.
2. Register it in the `serviceContents` array in `content/services/index.ts`.
3. Add its route to `routes` in `content/navigation.ts` (`path` must be `/services/<slug>`).

### `ServicePageContent` (`content/services/types.ts`)

| Field      | What it is                                                                  |
| ---------- | --------------------------------------------------------------------------- |
| `path`     | `/services/<slug>`; the slug is derived from it                             |
| `meta`     | `title`, `description` → `<title>`, meta description, Open Graph, canonical |
| `hero`     | `ServiceHeroContent`: h1, paragraphs, CTAs, photo, Clutch badge, checklist  |
| `sections` | ordered `ServiceSection[]`, each `{ type, content }`                        |

Section types, in the order Figma places them:

| `type`      | Component                 | Use for                                                                                                             |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `split`     | `SplitFeatureSection`     | heading + shaped photo beside points (Why us, Where we work, Use cases, "why it stalls"); `tone: "light" \| "dark"` |
| `grid`      | `CapabilityGridSection`   | "Where we plug in" icon-card grid                                                                                   |
| `steps`     | `StepsSection`            | numbered process                                                                                                    |
| `offerings` | `ServiceOfferingsSection` | the three expanding service cards (optional heading `cta`)                                                          |
| `proof`     | `ProofSection`            | one case study + "What we work with" details                                                                        |
| `faq`       | `FaqSection`              | accordion (`size`, `insetAnswers`)                                                                                  |
| `cta`       | `CtaBand`                 | call-to-action band (spread `homeContent.cta`, override copy)                                                       |

Split sections take layout options rather than new components: `headingAlign`, `narrowHeading`, `airy`,
`bulleted`, `regularTitles`, `smallLead`, `media.shape` / `media.position`, and `"\n"` in `heading` for a
forced break. Images go in `public/services/<name>/`, icons in `public/services/icons/<name>/`. Text that
differs on mobile uses `{ label, mobileLabel }` (hero checklist) or `secondaryCtaMobileLabel`.
