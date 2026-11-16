module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "default",
    ()=>DashboardPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const dynamic = "force-dynamic";
async function DashboardPage() {
    const [thu, chi, theo] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].transaction.aggregate({
            _sum: {
                amount: true
            },
            where: {
                type: 'INCOME'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].transaction.aggregate({
            _sum: {
                amount: true
            },
            where: {
                type: 'EXPENSE'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].transaction.groupBy({
            by: [
                'category'
            ],
            _sum: {
                amount: true
            },
            where: {
                type: 'EXPENSE'
            },
            orderBy: {
                _sum: {
                    amount: 'desc'
                }
            }
        })
    ]);
    const soDu = (thu._sum.amount ?? 0) - (chi._sum.amount ?? 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Tổng thu: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatVND"])(thu._sum.amount ?? 0)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Tổng chi: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatVND"])(chi._sum.amount ?? 0)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-bold",
                children: [
                    "Số dư: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatVND"])(soDu)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4",
                children: theo.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            d.category,
                            ": ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatVND"])(d._sum.amount ?? 0)
                        ]
                    }, d.category, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/generated/prisma/internal/class.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("generated/prisma/client.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[project]/generated/prisma/internal/class.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id           String         @id @default(cuid())\n  email        String         @unique\n  name         String\n  transactions Transaction[]\n  wishlist     WishlistItem[]\n}\n\nmodel Transaction {\n  id          String          @id @default(cuid())\n  userId      String\n  user        User            @relation(fields: [userId], references: [id], onDelete: Cascade)\n  type        TransactionType\n  amount      Int\n  description String\n  category    Category\n  date        DateTime\n  createdAt   DateTime        @default(now())\n\n  @@index([userId, date])\n}\n\nmodel WishlistItem {\n  id       String   @id @default(cuid())\n  userId   String\n  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  name     String\n  cost     Int\n  priority Priority @default(MEDIUM)\n}\n\nenum TransactionType {\n  INCOME\n  EXPENSE\n}\n\nenum Category {\n  FOOD\n  TRANSPORT\n  SALARY\n  OTHER\n}\n\nenum Priority {\n  LOW\n  MEDIUM\n  HIGH\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transactions\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"TransactionToUser\"},{\"name\":\"wishlist\",\"kind\":\"object\",\"type\":\"WishlistItem\",\"relationName\":\"UserToWishlistItem\"}],\"dbName\":null,\"schema\":null},\"Transaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TransactionToUser\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"TransactionType\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"Category\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null},\"WishlistItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToWishlistItem\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cost\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"priority\",\"kind\":\"enum\",\"type\":\"Priority\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"transactions\",\"wishlist\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Transaction.findUnique\",\"Transaction.findUniqueOrThrow\",\"Transaction.findFirst\",\"Transaction.findFirstOrThrow\",\"Transaction.findMany\",\"Transaction.createOne\",\"Transaction.createMany\",\"Transaction.createManyAndReturn\",\"Transaction.updateOne\",\"Transaction.updateMany\",\"Transaction.updateManyAndReturn\",\"Transaction.upsertOne\",\"Transaction.deleteOne\",\"Transaction.deleteMany\",\"_avg\",\"_sum\",\"Transaction.groupBy\",\"Transaction.aggregate\",\"WishlistItem.findUnique\",\"WishlistItem.findUniqueOrThrow\",\"WishlistItem.findFirst\",\"WishlistItem.findFirstOrThrow\",\"WishlistItem.findMany\",\"WishlistItem.createOne\",\"WishlistItem.createMany\",\"WishlistItem.createManyAndReturn\",\"WishlistItem.updateOne\",\"WishlistItem.updateMany\",\"WishlistItem.updateManyAndReturn\",\"WishlistItem.upsertOne\",\"WishlistItem.deleteOne\",\"WishlistItem.deleteMany\",\"WishlistItem.groupBy\",\"WishlistItem.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"name\",\"cost\",\"Priority\",\"priority\",\"equals\",\"in\",\"notIn\",\"not\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"TransactionType\",\"type\",\"amount\",\"description\",\"Category\",\"category\",\"date\",\"createdAt\",\"email\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "swEeMAgEAABoACAFAABpACA_AABmADBAAAAOABBBAABmADBCAQAAAAFEAQBnACFbAQAAAAEBAAAAAQAgDAMAAG0AID8AAG4AMEAAAAMAEEEAAG4AMEIBAGcAIUMBAGcAIVQAAG9UIlUCAGsAIVYBAGcAIVgAAHBYIllAAHEAIVpAAHEAIQEDAACnAQAgDAMAAG0AID8AAG4AMEAAAAMAEEEAAG4AMEIBAAAAAUMBAGcAIVQAAG9UIlUCAGsAIVYBAGcAIVgAAHBYIllAAHEAIVpAAHEAIQMAAAADACABAAAEADACAAAFACAJAwAAbQAgPwAAagAwQAAABwAQQQAAagAwQgEAZwAhQwEAZwAhRAEAZwAhRQIAawAhRwAAbEciAQMAAKcBACAJAwAAbQAgPwAAagAwQAAABwAQQQAAagAwQgEAAAABQwEAZwAhRAEAZwAhRQIAawAhRwAAbEciAwAAAAcAIAEAAAgAMAIAAAkAIAEAAAADACABAAAABwAgAQAAAAEAIAgEAABoACAFAABpACA_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_AABmADBAAAAOABBBAABmADBCAQBnACFEAQBnACFbAQBnACELSAEAAAABSQEAAAAESgEAAAAESwEAWgAhTAEAAAABTQEAAAABTgEAAAABTwEAAAABUAEAAAABUQEAAAABUgEAAAABA1wAAAMAIF0AAAMAIF4AAAMAIANcAAAHACBdAAAHACBeAAAHACAJAwAAbQAgPwAAagAwQAAABwAQQQAAagAwQgEAZwAhQwEAZwAhRAEAZwAhRQIAawAhRwAAbEciCEgCAAAAAUkCAAAABEoCAAAABEsCAFUAIUwCAAAAAU0CAAAAAU4CAAAAAU8CAAAAAQRIAAAARwJJAAAARwhKAAAARwhLAABWRyIKBAAAaAAgBQAAaQAgPwAAZgAwQAAADgAQQQAAZgAwQgEAZwAhRAEAZwAhWwEAZwAhXwAADgAgYAAADgAgDAMAAG0AID8AAG4AMEAAAAMAEEEAAG4AMEIBAGcAIUMBAGcAIVQAAG9UIlUCAGsAIVYBAGcAIVgAAHBYIllAAHEAIVpAAHEAIQRIAAAAVAJJAAAAVAhKAAAAVAhLAABkVCIESAAAAFgCSQAAAFgISgAAAFgISwAAYlgiCEhAAAAAAUlAAAAABEpAAAAABEtAAGAAIUxAAAAAAU1AAAAAAU5AAAAAAU9AAAAAAQAAAAAAAWQBAAAAAQVkAgAAAAFqAgAAAAFrAgAAAAFsAgAAAAFtAgAAAAEBZAAAAEcCBRMAAK8BACAUAACyAQAgYQAAsAEAIGIAALEBACBnAAABACADEwAArwEAIGEAALABACBnAAABACAAAAAAAAFkAAAAVAIBZAAAAFgCAWRAAAAAAQUTAACqAQAgFAAArQEAIGEAAKsBACBiAACsAQAgZwAAAQAgAxMAAKoBACBhAACrAQAgZwAAAQAgAAAACxMAAJcBADAUAACcAQAwYQAAmAEAMGIAAJkBADBjAACaAQAgZAAAmwEAMGUAAJsBADBmAACbAQAwZwAAmwEAMGgAAJ0BADBpAACeAQAwCxMAAIsBADAUAACQAQAwYQAAjAEAMGIAAI0BADBjAACOAQAgZAAAjwEAMGUAAI8BADBmAACPAQAwZwAAjwEAMGgAAJEBADBpAACSAQAwBEIBAAAAAUQBAAAAAUUCAAAAAUcAAABHAgIAAAAJACATAACWAQAgAwAAAAkAIBMAAJYBACAUAACVAQAgAQwAAKkBADAJAwAAbQAgPwAAagAwQAAABwAQQQAAagAwQgEAAAABQwEAZwAhRAEAZwAhRQIAawAhRwAAbEciAgAAAAkAIAwAAJUBACACAAAAkwEAIAwAAJQBACAIPwAAkgEAMEAAAJMBABBBAACSAQAwQgEAZwAhQwEAZwAhRAEAZwAhRQIAawAhRwAAbEciCD8AAJIBADBAAACTAQAQQQAAkgEAMEIBAGcAIUMBAGcAIUQBAGcAIUUCAGsAIUcAAGxHIgRCAQB3ACFEAQB3ACFFAgB4ACFHAAB5RyIEQgEAdwAhRAEAdwAhRQIAeAAhRwAAeUciBEIBAAAAAUQBAAAAAUUCAAAAAUcAAABHAgdCAQAAAAFUAAAAVAJVAgAAAAFWAQAAAAFYAAAAWAJZQAAAAAFaQAAAAAECAAAABQAgEwAAogEAIAMAAAAFACATAACiAQAgFAAAoQEAIAEMAACoAQAwDAMAAG0AID8AAG4AMEAAAAMAEEEAAG4AMEIBAAAAAUMBAGcAIVQAAG9UIlUCAGsAIVYBAGcAIVgAAHBYIllAAHEAIVpAAHEAIQIAAAAFACAMAAChAQAgAgAAAJ8BACAMAACgAQAgCz8AAJ4BADBAAACfAQAQQQAAngEAMEIBAGcAIUMBAGcAIVQAAG9UIlUCAGsAIVYBAGcAIVgAAHBYIllAAHEAIVpAAHEAIQs_AACeAQAwQAAAnwEAEEEAAJ4BADBCAQBnACFDAQBnACFUAABvVCJVAgBrACFWAQBnACFYAABwWCJZQABxACFaQABxACEHQgEAdwAhVAAAgQFUIlUCAHgAIVYBAHcAIVgAAIIBWCJZQACDAQAhWkAAgwEAIQdCAQB3ACFUAACBAVQiVQIAeAAhVgEAdwAhWAAAggFYIllAAIMBACFaQACDAQAhB0IBAAAAAVQAAABUAlUCAAAAAVYBAAAAAVgAAABYAllAAAAAAVpAAAAAAQQTAACXAQAwYQAAmAEAMGMAAJoBACBnAACbAQAwBBMAAIsBADBhAACMAQAwYwAAjgEAIGcAAI8BADAAAAIEAAClAQAgBQAApgEAIAdCAQAAAAFUAAAAVAJVAgAAAAFWAQAAAAFYAAAAWAJZQAAAAAFaQAAAAAEEQgEAAAABRAEAAAABRQIAAAABRwAAAEcCBAUAAKQBACBCAQAAAAFEAQAAAAFbAQAAAAECAAAAAQAgEwAAqgEAIAMAAAAOACATAACqAQAgFAAArgEAIAYAAAAOACAFAACKAQAgDAAArgEAIEIBAHcAIUQBAHcAIVsBAHcAIQQFAACKAQAgQgEAdwAhRAEAdwAhWwEAdwAhBAQAAKMBACBCAQAAAAFEAQAAAAFbAQAAAAECAAAAAQAgEwAArwEAIAMAAAAOACATAACvAQAgFAAAswEAIAYAAAAOACAEAACJAQAgDAAAswEAIEIBAHcAIUQBAHcAIVsBAHcAIQQEAACJAQAgQgEAdwAhRAEAdwAhWwEAdwAhAwQGAgUKAwYABAEDAAEBAwABAgQLAAUMAAAAAAMGAAkZAAoaAAsAAAADBgAJGQAKGgALAQMAAQEDAAEFBgAQGQATGgAUKwARLAASAAAAAAAFBgAQGQATGgAUKwARLAASAQMAAQEDAAEFBgAZGQAcGgAdKwAaLAAbAAAAAAAFBgAZGQAcGgAdKwAaLAAbBwIBCA0BCRABChEBCxIBDRQBDhYFDxcGEBkBERsFEhwHFR0BFh4BFx8FGyIIHCMMHSQCHiUCHyYCICcCISgCIioCIywFJC0NJS8CJjEFJzIOKDMCKTQCKjUFLTgPLjkVLzoDMDsDMTwDMj0DMz4DNEADNUIFNkMWN0UDOEcFOUgXOkkDO0oDPEsFPU4YPk8e"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "JsonNull",
    ()=>JsonNull,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "QueryMode",
    ()=>QueryMode,
    "SortOrder",
    ()=>SortOrder,
    "Sql",
    ()=>Sql,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "TransactionScalarFieldEnum",
    ()=>TransactionScalarFieldEnum,
    "UserScalarFieldEnum",
    ()=>UserScalarFieldEnum,
    "WishlistItemScalarFieldEnum",
    ()=>WishlistItemScalarFieldEnum,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    User: 'User',
    Transaction: 'Transaction',
    WishlistItem: 'WishlistItem'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name'
};
const TransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    category: 'category',
    date: 'date',
    createdAt: 'createdAt'
};
const WishlistItemScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    cost: 'cost',
    priority: 'priority'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
"[project]/lib/finance.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatVND",
    ()=>formatVND,
    "startOfMonth",
    ()=>startOfMonth
]);
const vnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
});
function formatVND(amount) {
    return vnd.format(amount);
}
function startOfMonth(d = new Date()) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
}),
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function createPrismaClient() {
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaPg"]({
        connectionString: process.env.DATABASE_URL
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
        adapter
    });
}
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? createPrismaClient();
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__08sn7m6em0eqs._.js.map