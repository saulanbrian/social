export type Notification = {
  id:string | number;
  is_read:boolean;
  notification_type:string;
  target_type:string;
  target_id:string;
  message:string;
  date_time_created:string;
  actor_id:string;
  actor_username:string;
  actor_profile:string;
  previewed:boolean
}