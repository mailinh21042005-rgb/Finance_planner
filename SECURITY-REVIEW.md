# Security Review

## Findings

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟡 MEDIUM | app/transactions/actions.ts | 33-38 | The delete action reads `id` directly from `FormData` and does not validate it with Zod before constructing the Prisma query. | 8/10 |
| 2 | 🟡 MEDIUM | app/wishlist/actions.ts | 33-58 | The update and delete actions only check that `id` is a non-empty string; they do not validate it with Zod before constructing Prisma queries. | 8/10 |

## Remediation

- For both wishlist mutations, add a Zod object schema such as `z.object({ id: z.string().trim().min(1) })`, validate `id`, and stop when validation fails.
- For `deleteTransaction`, validate `id` with Zod before calling `requireUser()` and `deleteMany()`.
- Prefer a Prisma/CUID-specific Zod check if ID format is known and consistently enforced.

## Checklist Result

- Server-side session checks: all application Server Actions and the transaction Route Handler call `requireUser()` or `getSession()` before data access.
- User scoping: application Prisma queries contain `userId`; mutation queries use both `id` and `userId`.
- Zod input validation: create and filter inputs are validated; delete/update item IDs listed above are not validated with Zod.
- Public secrets: no `NEXT_PUBLIC_*` variable usage was found.
- Dangerous sinks: no `dangerouslySetInnerHTML` or `$queryRawUnsafe` usage was found.
