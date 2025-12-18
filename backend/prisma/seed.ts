// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🚀 Starting Habit → HabitRun migration');

//   const habits = await prisma.habit.findMany({
//     include: {
//       dayLogs: {
//         orderBy: { date: 'asc' },
//       },
//     },
//   });

//   console.log(`Found ${habits.length} habits`);

//   for (const habit of habits) {
//     // защита от повторного запуска
//     const existingRun = await prisma.habitRun.findFirst({
//       where: { habitId: habit.id },
//     });

//     if (existingRun) {
//       console.log(`⏭ Habit ${habit.id} already has a run, skipping`);
//       continue;
//     }

//     const firstLogDate = habit.dayLogs[0]?.date;
//     const startDate = firstLogDate ?? new Date();

//     const runStatus =
//       habit.status === 'built'
//         ? 'built'
//         : habit.status === 'cancelled'
//           ? 'cancelled'
//           : 'active';

//     const run = await prisma.habitRun.create({
//       data: {
//         habitId: habit.id,
//         status: runStatus,
//         totalDays: 21, // ⚠️ если раньше было поле в Habit — подставь его
//         startDate,
//         builtAt: habit.status === 'built' ? new Date() : null,
//         cancelledAt: habit.status === 'cancelled' ? new Date() : null,
//       },
//     });

//     if (habit.dayLogs.length > 0) {
//       await prisma.habitDayLog.updateMany({
//         where: {
//           id: { in: habit.dayLogs.map((l) => l.id) },
//         },
//         data: {
//           habitRunId: run.id,
//         },
//       });
//     }

//     console.log(`✅ Migrated habit ${habit.id}`);
//   }

//   console.log('🎉 Migration finished successfully');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Migration failed', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
