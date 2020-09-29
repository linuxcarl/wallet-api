export interface Subscription {
  id: number;
  code: string;
  user_id: number;
  amount: number;
  cron: string;
  create_at?: Date;
  update_at?: Date;
}
