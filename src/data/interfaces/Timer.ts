interface Timer {
  id: number;
  start: Date;
  end?: Date;
  taskId: number;
}
interface TimerCreateInput {
  end?: Date;
  start: Date;
  taskId: number;
}
export type { Timer, TimerCreateInput };
