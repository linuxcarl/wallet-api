export interface SubscriptionCreateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}
