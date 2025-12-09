import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const dayLogStatus = ['completed', 'missed'];

async function seedHabitLogs(habitId: string, startDate: Date, count: number) {
  try {
    await prisma.habitDayLog.deleteMany({
      where: {
        habitId,
      },
    });

    console.log('Deleted previous logs');

    // const logs = [] as any[];

    // for (let i = 0; i < count; i++) {
    //   const date = new Date(startDate);
    //   date.setDate(startDate.getDate() + i);

    //   logs.push({
    //     date: date.toISOString(),
    //     status:
    //       Math.random() > 0.3
    //         ? HabitDayStatus.completed
    //         : HabitDayStatus.missed,
    //     habitId,
    //   });
    // }

    // await prisma.habitDayLog.createMany({
    //   data: logs,
    //   skipDuplicates: true,
    // });

    // console.log(`Inserted ${logs.length} logs for habit ${habitId}`);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await seedHabitLogs(
    '4de728e3-d087-4440-bcd7-433769dd27f0',
    new Date('2025-11-23T12:34:56.789Z'),
    10,
  );
}

main()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
