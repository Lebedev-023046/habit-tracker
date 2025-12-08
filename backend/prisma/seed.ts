import { HabitDayStatus, PrismaClient } from '@prisma/client';

const data = [
  {
    date: '2025-11-23T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-24T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-25T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-26T12:34:56.789Z',
    status: 'missed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-27T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-28T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-29T12:34:56.789Z',
    status: 'missed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-11-30T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-12-01T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-12-02T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
  {
    date: '2025-12-03T12:34:56.789Z',
    status: 'completed',
    habitId: '1f81faa7-f9b4-4e4e-92c4-c56ac0ad634e',
  },
];

const prisma = new PrismaClient();

// const dayLogStatus = ['completed', 'missed'];

HabitDayStatus;

async function seedHabitLogs(habitId: string, startDate: Date, count: number) {
  try {
    await prisma.habitDayLog.deleteMany({
      where: {
        habitId,
      },
    });

    console.log('Deleted previous logs');

    const logs = [] as any[];

    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      logs.push({
        date: date.toISOString(),
        status:
          Math.random() > 0.3
            ? HabitDayStatus.completed
            : HabitDayStatus.missed,
        habitId,
      });
    }

    await prisma.habitDayLog.createMany({
      data: logs,
      skipDuplicates: true,
    });

    console.log(`Inserted ${logs.length} logs for habit ${habitId}`);
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
