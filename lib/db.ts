import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// async function test() {
//   const like = await db.like.create({
//     data: {
//       user: { connect: { id: 1 } },
//       tweet: { connect: { id: 1 } },
//     },
//   });
// }

// async function test() {
//   const tweet = await db.tweet.create({
//     data: {
//       tweet: 'Hi!!!',
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
// }

// async function test() {
// const user = await db.user.create({
//   data: {
//     username: 'test',
//     password: 'asd123',
//     email: 'test@naver.com',
//   },
// });
//   const users = await db.user.findMany({
//     where: {
//       username: {
//         contains: 'est',
//       },
//     },
//   });
//   console.log(users);
// }

// test();

export default db;
