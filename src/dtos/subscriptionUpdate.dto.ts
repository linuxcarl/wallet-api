export interface SubscriptionUpdateDto {
  id: number;
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}
